<script lang="ts">
	import { onMount } from "svelte";
	import type { MENFESS } from "../../../constants/post_types";
	import { Tables, type FessFriends } from "../../../constants/tables";
	import { removeHTMLElements, truncateText } from "../../../helper/text";
	import Modal from "./Modal.svelte";
	import ModalStillDevelopment from "../modals/ModalStillDevelopment.svelte";
	import ModalOnlyPremiumAccess from "../modals/ModalOnlyPremiumAccess.svelte";
	import ModalEditPostFessFriends from "../modals/ModalEditPostFessFriends.svelte";
	import ModalPostDetail from "../modals/ModalPostDetail.svelte";
	import type { FDDelete, FDPin } from "../../../constants/form_data";
	import { DataType } from "../../../constants/data_types";

    export let menfess: FessFriends;
    export let userId: string;

    let showDropdown = false;
    function toggleDropdown() {
        showDropdown = !showDropdown;
    }

    let isPinned: boolean = false;
    let isEdited: boolean = false;
    onMount(async () => {
        isPinned = await getIsPinned(menfess.table_name, menfess.link)
        isEdited = await getIsEdited(menfess.table_name, menfess.link)

        menfess = {...menfess, message: removeHTMLElements(menfess.message)}
    })

    // modals
    let isShowModalNotPremium: boolean = false;
    let isShowModalThereIsPinned: boolean = false;
    let isShowModalAlreadyEdited: boolean = false;
    let isShowModalEditing: boolean = false;
    let isShowModalPostDetail: boolean = false;

    const clickOptionHandler = async (optionType: 'pin' | 'edit' | 'delete') => {
        const isPremium = await getIsPremium(userId)
        if (optionType == "pin") {
            if (!isPremium) {
                isShowModalNotPremium = true
            } else {
                // check if UNPIN
                if (isPinned) {
                    // send back data to telegram bot to UNPIN post
                    const sumbmittedData: FDPin = {
                            type: DataType.UNPIN,
                            link: menfess.link,
                            table: menfess.table_name,
                        }
                    window.Telegram.WebApp.sendData(JSON.stringify({ data: sumbmittedData }));
                } else {
                    const isAnyPinned = await getIsAnyPinned(userId, menfess.table_name)
                    if (isAnyPinned) {
                        isShowModalThereIsPinned = true;
                    } else {
                        if (confirm("Apakah kamu yakin untuk PIN postingan ini?")) {
                            // send back data to telegram bot to PIN post
                            const sumbmittedData: FDPin = {
                                type: DataType.PIN,
                                link: menfess.link,
                                table: menfess.table_name,
                            }
                            window.Telegram.WebApp.sendData(JSON.stringify({ data: sumbmittedData }));
                        }
                    }
                }
            }
        } else if (optionType == "edit") {
            if (!isPremium) {
                isShowModalNotPremium = true
            } else {
                if (isEdited) {
                    isShowModalAlreadyEdited = true;
                } else {
                    isShowModalEditing = true;
                }
            }
        } else if (optionType == "delete") {
            if (!isPremium) {
                isShowModalNotPremium = true
            } else {
                if (confirm("Apakah kamu yakin untuk menghapus postingan ini?")) {
                    // send back data to telegram bot to delete post
                    const sumbmittedData: FDDelete = {
                        type: DataType.DELETE,
                        link: menfess.link,
                        table: menfess.table_name,
                    }
                    window.Telegram.WebApp.sendData(JSON.stringify({ data: sumbmittedData }));
                }
            }
        }
    }

    // apis
    const getIsPremium = async (userId: string): Promise<boolean> => {
        const isPremium = await fetch("/api/users/get/is_premium_by_user_id?user-id=" + userId, { method: "GET" }).then((res) => res.json())
        return isPremium;
    }
    const getIsPinned = async (table: string, link: string): Promise<boolean> => {
		const isPinned = await fetch(`/api/${table}/get/is_pinned_by_link?link=` + link, {method: "GET"}).then((res) => res.json());
        return isPinned;
	}
    const getIsAnyPinned = async (userId: string, table: Tables): Promise<boolean> => {
		const isAnyPinned = await fetch(`/api/${table}/get/is_any_pinned_by_user_id?user-id=` + userId, {method: "GET"}).then((res) => res.json());
        return isAnyPinned;
	}
    const getIsEdited = async (table: string, link: string): Promise<boolean> => {
		const isEdited = await fetch(`/api/${table}/get/is_edited_by_link?link=` + link, {method: "GET"}).then((res) => res.json());
        return isEdited;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
    id="post-manager-card"
    class="flex justify-between w-full items-center px-4 py-2 rounded-lg border-gray-400 border-solid border relative"
>
    <p on:click={() => { isShowModalPostDetail = true }} class="!text-secondary !text-sm relative z-0 w-full cursor-pointer">{truncateText(menfess.new_msg ? menfess.new_msg : menfess.message, 35)}</p>
    <div class="relative">
        <i class="fa-solid {showDropdown ? 'fa-xmark' : 'fa-ellipsis-vertical'} cursor-pointer text-secondary" on:click={toggleDropdown}></i>
        {#if showDropdown}
            <div class="absolute right-0 mt-2 border border-secondary rounded shadow z-50">
                <ul class="text-sm bg-white">
                    <li class="px-4 py-2 hover:bg-gray-100 {isPinned ? 'text-gray-400' : 'text-gray-500'} cursor-pointer" on:click={() => { clickOptionHandler('pin') }}>{isPinned ? "Unpin" : "Pin"}</li>
                    <li class="px-4 py-2 hover:bg-gray-100 {isEdited ? 'text-gray-400' : 'text-gray-500'} cursor-pointer" on:click={() => { clickOptionHandler('edit') }}>Edit</li>
                    <li class="px-4 py-2 hover:bg-gray-100 text-gray-500 cursor-pointer" on:click={() => { clickOptionHandler('delete') }}>Hapus</li>
                </ul>
            </div>
        {/if}
    </div>
</div>

<!-- MODALS -->
<ModalOnlyPremiumAccess bind:isShowModalNotPremium={isShowModalNotPremium} />
<Modal bind:showModal={isShowModalThereIsPinned}>
    <h3 class="text-center">Ehh, ada postingan kamu yang masih ter-pin. Maksimal hanya bisa 1 pin yaa 🙌</h3>
</Modal>
<Modal bind:showModal={isShowModalAlreadyEdited}>
    <h3 class="text-center">Yahh, kamu ga bisa edit postingan ini lagi karena udah pernah kamu edit sebelumnya 😢</h3>
</Modal>
<ModalEditPostFessFriends bind:isShowModal={isShowModalEditing} data={menfess} />
<ModalPostDetail bind:isShowModal={isShowModalPostDetail} data={menfess} />

<style lang="postcss">
  .relative ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>