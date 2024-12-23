<script lang="ts">
	import { onMount } from "svelte";
	import type { MENFESS } from "../../../constants/post_types";
	import type { FessFriends, Tables } from "../../../constants/tables";
	import { truncateText } from "../../../helper/text";
	import Modal from "./Modal.svelte";
	import ModalStillDevelopment from "../modals/ModalStillDevelopment.svelte";
	import ModalOnlyPremiumAccess from "../modals/ModalOnlyPremiumAccess.svelte";
	import ModalEditPostFessFriends from "../modals/ModalEditPostFessFriends.svelte";

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
    })

    // TODO: remove this modal if setting feature already developed
    let isShowModalOnDev: boolean = false;
    let isShowModalNotPremium: boolean = false;
    let isShowModalThereIsPinned: boolean = false;
    let isShowModalAlreadyEdited: boolean = false;
    let isShowModalEditing: boolean = false;

    const clickOptionHandler = async (optionType: 'pin' | 'edit' | 'delete') => {
        const isPremium = await getIsPremium(userId)
        if (optionType == "pin") {
            if (!isPremium) {
                isShowModalNotPremium = true
            } else {
                const isAnyPinned = await getIsAnyPinned(userId, menfess.table_name)
                if (isAnyPinned) {
                    isShowModalThereIsPinned = true;
                } else {
                    // TODO: send back data to telegram bot
                    console.log("TODO: send back data to telegram bot")
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
                    // TODO: send back data to telegram bot to delete post
                    console.log("// TODO: send back data to telegram bot to delete post")
                }
            }
        }
    }

    // apis
    const getIsPremium = async (userId: string): Promise<boolean> => {
        const isPremium = await fetch("/users/is_premium?user-id=" + userId, { method: "GET" }).then((res) => res.json())
        return isPremium;
    }
    const getIsPinned = async (table: string, link: string): Promise<boolean> => {
		const isPinned = await fetch("/posts/is_pinned?table=" + table + "&link=" + link, {method: "GET"}).then((res) => res.json());
        return isPinned;
	}
    const getIsAnyPinned = async (userId: string, table: Tables): Promise<boolean> => {
		const isAnyPinned = await fetch("/posts/is_any_pinned?user-id=" + userId + "&table=" + table, {method: "GET"}).then((res) => res.json());
        return isAnyPinned;
	}
    const getIsEdited = async (table: string, link: string): Promise<boolean> => {
		const isEdited = await fetch("/posts/is_edited?table=" + table + "&link=" + link, {method: "GET"}).then((res) => res.json());
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
    <p class="!text-secondary !text-xs relative z-0">{truncateText(menfess.message, 35)}</p>
    <div class="relative">
        <i class="fa-solid {showDropdown ? 'fa-xmark' : 'fa-bars'} cursor-pointer text-secondary" on:click={toggleDropdown}></i>
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

<ModalOnlyPremiumAccess bind:isShowModalNotPremium={isShowModalNotPremium} />
<Modal bind:showModal={isShowModalThereIsPinned}>
    <h3 class="text-center">Ehh, ada postingan kamu yang masih ter-pin. Maksimal hanya bisa 1 pin yaa 🙌</h3>
</Modal>
<Modal bind:showModal={isShowModalAlreadyEdited}>
    <h3 class="text-center">Yahh, kamu ga bisa edit postingan ini lagi karena udah pernah kamu edit sebelumnya 😢</h3>
</Modal>
<ModalEditPostFessFriends bind:isShowModal={isShowModalEditing} data={menfess} />
<ModalStillDevelopment bind:isShowModalOnDev={isShowModalOnDev} />

<style lang="postcss">
  .relative ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>