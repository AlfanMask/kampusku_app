<script lang="ts">
	import { onMount } from "svelte";
	import { Tables, type Mager } from "../../../constants/tables";
	import { removeHTMLElements, truncateText } from "../../../helper/text";
	import ModalStillDevelopment from "../modals/ModalStillDevelopment.svelte";
	import Modal from "./Modal.svelte";
	import ModalOnlyPremiumAccess from "../modals/ModalOnlyPremiumAccess.svelte";
	import ModalEditPostMager from "../modals/ModalEditPostMager.svelte";
	import ModalPostDetail from "../modals/ModalPostDetail.svelte";
	import type { FDClose, FDDelete, FDPin } from "../../../constants/form_data";
	import { DataType } from "../../../constants/data_types";
	import ModalCancelExplanation from "../modals/ModalCancelExplanation.svelte";

    export let mager: Mager;
    export let userId: string;

    let isPinned: boolean = false;
    let isClosed: boolean = false;
    let isCanceled: boolean = false;
    let isEdited: boolean = false;
    onMount(async () => {
        isPinned = await getIsPinned(mager.link)
        isClosed = await getIsClosed(mager.link)
        isCanceled = await getIsCanceled(mager.link)
        isEdited = await getIsEdited(mager.link)

        mager = {...mager, message: removeHTMLElements(mager.message)}
    })

    let showDropdown1 = false;
    let showDropdown2 = false;

    const toggleDropdownHandler = (dropdownType: 'showDropdown1' | 'showDropdown2') => {
        if (dropdownType === 'showDropdown1') {
            showDropdown1 = !showDropdown1;
            showDropdown2 = false;
        } else {
            showDropdown2 = !showDropdown2;
            showDropdown1 = false;
        }
    }

    // modals
    let isShowModalNotPremium: boolean = false;
    let isShowModalThereIsPinned: boolean = false;
    let isShowModalAlreadyClosed: boolean = false;
    let isShowModalAlreadyCanceled: boolean = false;
    let isShowModalAlreadyEdited: boolean = false;
    let isShowModalEditing: boolean = false;
    let isSHowModalCancelExplanation: boolean = false;
    let isShowModalPostDetail: boolean = false;

    const clickOptionHandler = async (optionType: 'pin' | 'edit' | 'delete' | 'close' | 'cancel') => {
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
                            link: mager.link,
                            table: mager.table_name,
                        }
                    window.Telegram.WebApp.sendData(JSON.stringify({ data: sumbmittedData }));                     
                } else {
                    const isAnyPinned = await getIsAnyPinned(userId)
                    if (isAnyPinned) {
                        isShowModalThereIsPinned = true;
                    } else {
                        if (confirm("Apakah kamu yakin untuk PIN postingan ini?")) {
                            // send back data to telegram bot to PIN post
                            const sumbmittedData: FDPin = {
                                type: DataType.PIN,
                                link: mager.link,
                                table: mager.table_name,
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
                        link: mager.link,
                        table: mager.table_name,
                    }
                    window.Telegram.WebApp.sendData(JSON.stringify({ data: sumbmittedData }));
                }
            }
        } else if (optionType == "close") {
            if(!isClosed){
                if (confirm("Apakah kamu yakin untuk menutup postingan ini?")) {
                    // send back data to telegram bot to close post
                    const sumbmittedData: FDClose = {
                        type: DataType.CLOSE,
                        link: mager.link,
                    }
                    window.Telegram.WebApp.sendData(JSON.stringify({ data: sumbmittedData }));
                }
            } else {
                isShowModalAlreadyClosed = true;
            }
        } else if (optionType == "cancel") {
            if(!isCanceled){
                isSHowModalCancelExplanation = true;
            } else {
                isShowModalAlreadyCanceled = true;
            }
        }
    }

    // apis
    const getIsPremium = async (userId: string): Promise<boolean> => {
        const isPremium = await fetch("/api/users/get/is_premium_by_user_id?user-id=" + userId, { method: "GET" }).then((res) => res.json())
        return isPremium;
    }
    const getIsPinned = async (link: string): Promise<boolean> => {
		const isPinned = await fetch("/api/magers/get/is_pinned_by_link?link=" + link, {method: "GET"}).then((res) => res.json());
        return isPinned;
	}
    const getIsAnyPinned = async (userId: string): Promise<boolean> => {
		const isAnyPinned = await fetch("/api/magers/get/is_any_pinned_by_user_id?user-id=" + userId, {method: "GET"}).then((res) => res.json());
        return isAnyPinned;
	}
    const getIsEdited = async (link: string): Promise<boolean> => {
		const isEdited = await fetch("/api/magers/get/is_edited_by_link?link=" + link, {method: "GET"}).then((res) => res.json());
        return isEdited;
	}
    const getIsClosed = async (link: string): Promise<boolean> => {
		const isClosed = await fetch("/api/magers/get/is_closed_by_link?link=" + link, {method: "GET"}).then((res) => res.json());
        return isClosed;
	}
    const getIsCanceled = async (link: string): Promise<boolean> => {
		const isClosed = await fetch("/api/magers/get/is_canceled_by_link?link=" + link, {method: "GET"}).then((res) => res.json());
        return isClosed;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
    id="post-manager-card"
    class="flex flex-col justify-between w-full items-center px-4 py-2 rounded-lg border-gray-400 border-solid border relative"
>
    <p on:click={() => { isShowModalPostDetail = true }} class="!text-secondary !text-sm relative z-0 w-full cursor-pointer pb-4 h-full">{truncateText(mager.new_msg ? mager.new_msg : mager.message, 35)}</p>
    <div id="bottom" class="w-full flex justify-between items-center">
        <div id="stats" class="flex gap-2">
            <div id="comments" class="flex items-center gap-1">
                <i class="fa-regular fa-comment"></i>
                <span>{!mager.num_comments ? "0" : mager.num_comments}</span>
            </div>
            <div id="reactions" class="flex items-center gap-1">
                <i class="fa-solid fa-icons"></i>
                <span>{mager.num_reactions}</span>
            </div>
        </div>
        <div class="flex gap-2">
            <div class="relative">
                <i class="fa-solid {showDropdown1 ? 'fa-xmark' : 'fa-right-left'} cursor-pointer text-secondary" on:click={() => toggleDropdownHandler('showDropdown1')}></i>
                {#if showDropdown1}
                    <div class="absolute right-0 mt-2 border border-gray-300 rounded shadow z-50">
                        <ul class="text-sm bg-white">
                            <li class="px-4 py-2 hover:bg-gray-100 {isClosed ? 'text-gray-400' : 'text-gray-500'} cursor-pointer" on:click={() => { clickOptionHandler('close') }}>Close</li>
                            <li class="px-4 py-2 hover:bg-gray-100 {isCanceled ? 'text-gray-400' : 'text-gray-500'} cursor-pointer" on:click={() => { clickOptionHandler('cancel') }}>Cancel</li>
                        </ul>
                    </div>
                {/if}
            </div>
            <div class="relative">
                <i class="fa-solid {showDropdown2 ? 'fa-xmark' : 'fa-bars'} cursor-pointer text-secondary" on:click={() => toggleDropdownHandler('showDropdown2')}></i>
                {#if showDropdown2}
                    <div class="absolute right-0 mt-2 border border-gray-300 rounded shadow z-50">
                        <ul class="text-sm bg-white">
                            <li class="px-4 py-2 hover:bg-gray-100 {isPinned ? 'text-gray-400' : 'text-gray-500'} cursor-pointer" on:click={() => { clickOptionHandler('pin') }}>{isPinned ? "Unpin" : "Pin"}</li>
                            <li class="px-4 py-2 hover:bg-gray-100 {isEdited ? 'text-gray-400' : 'text-gray-500'} cursor-pointer" on:click={() => { clickOptionHandler('edit') }}>Edit</li>
                            <li class="px-4 py-2 hover:bg-gray-100 text-gray-500 cursor-pointer" on:click={() => { clickOptionHandler('delete') }}>Hapus</li>
                        </ul>
                    </div>
                {/if}
            </div>
        </div>
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
<ModalEditPostMager bind:isShowModal={isShowModalEditing} data={mager} />
<ModalCancelExplanation bind:isShowModal={isSHowModalCancelExplanation} data={mager} />
<Modal bind:showModal={isShowModalAlreadyClosed}>
    <h3 class="text-center">Kamu ga perlu close lagi postingan ini lagi karena udah #CLOSED 😉</h3>
</Modal>
<Modal bind:showModal={isShowModalAlreadyCanceled}>
    <h3 class="text-center">Kamu ga perlu membatalkan lagi postingan ini karena udah #CANCELED 😉</h3>
</Modal>
<ModalPostDetail bind:isShowModal={isShowModalPostDetail} data={mager} />

<style lang="postcss">
  .relative ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  #stats i, #stats span {
    @apply !text-secondary text-xs;
  }
</style>