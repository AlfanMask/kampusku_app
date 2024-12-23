<script lang="ts">
	import { onMount } from "svelte";
	import { Tables, type Mager } from "../../../constants/tables";
	import { removeHTMLElements, truncateText } from "../../../helper/text";
	import ModalStillDevelopment from "../modals/ModalStillDevelopment.svelte";
	import Modal from "./Modal.svelte";
	import ModalOnlyPremiumAccess from "../modals/ModalOnlyPremiumAccess.svelte";
	import ModalEditPostMager from "../modals/ModalEditPostMager.svelte";
	import ModalPostDetail from "../modals/ModalPostDetail.svelte";

    export let mager: Mager;
    export let userId: string;

    let isPinned: boolean = false;
    let isClosed: boolean = false;
    let isCanceled: boolean = false;
    let isEdited: boolean = false;
    onMount(async () => {
        isPinned = await getIsPinned(Tables.magers, mager.link)
        isClosed = await getIsClosed(mager.link)
        isCanceled = await getIsCanceled(mager.link)
        isEdited = await getIsEdited(Tables.magers, mager.link)

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

    // TODO: remove this modal if setting feature already developed
    let isShowModalOnDev: boolean = false;
    let isShowModalNotPremium: boolean = false;
    let isShowModalThereIsPinned: boolean = false;
    let isShowModalAlreadyClosed: boolean = false;
    let isShowModalAlreadyCanceled: boolean = false;
    let isShowModalAlreadyEdited: boolean = false;
    let isShowModalEditing: boolean = false;
    let isShowModalPostDetail: boolean = false;

    const clickOptionHandler = async (optionType: 'pin' | 'edit' | 'delete' | 'close' | 'cancel') => {
        const isPremium = await getIsPremium(userId)
        if (optionType == "pin") {
            if (!isPremium) {
                isShowModalNotPremium = true
            } else {
                // check if UNPIN
                if (isPinned) {
                    // TODO: send back data to telegram bot to UNPIN post
                    console.log("TODO: send back data to telegram bot to UNPIN post")                        
                } else {
                    const isAnyPinned = await getIsAnyPinned(userId, mager.table_name)
                    if (isAnyPinned) {
                        isShowModalThereIsPinned = true;
                    } else {
                        // TODO: send back data to telegram bot to PIN post
                        console.log("TODO: send back data to telegram bot to PIN post")
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
                    // TODO: send back data to telegram bot to delete post
                    console.log("// TODO: send back data to telegram bot to delete post")
                }
            }
        } else if (optionType == "close") {
            if(!isClosed){
                if (confirm("Apakah kamu yakin untuk menutup postingan ini?")) {
                    // TODO: send back data to telegram bot to close post
                    console.log("// TODO: send back data to telegram bot to close post")
                }
            } else {
                isShowModalAlreadyClosed = true;
            }
        } else if (optionType == "cancel") {
            if(!isCanceled){
                if (confirm("Apakah kamu yakin untuk membatalkan postingan ini?")) {
                    // TODO: send back data to telegram bot to cancel post
                    console.log("// TODO: send back data to telegram bot to cancel post")
                }
            } else {
                isShowModalAlreadyCanceled = true;
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
    const getIsClosed = async (link: string): Promise<boolean> => {
		const isClosed = await fetch("/posts/magers/is_closed?link=" + link, {method: "GET"}).then((res) => res.json());
        return isClosed;
	}
    const getIsCanceled = async (link: string): Promise<boolean> => {
		const isClosed = await fetch("/posts/magers/is_canceled?link=" + link, {method: "GET"}).then((res) => res.json());
        return isClosed;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
    id="post-manager-card"
    class="flex justify-between items-center px-4 py-2 rounded-lg border-gray-400 border-solid border relative"
>
    <p on:click={() => { isShowModalPostDetail = true }} class="!text-secondary !text-xs relative z-0 w-full cursor-pointer">{truncateText(mager.message, 25)}</p>
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

<ModalOnlyPremiumAccess bind:isShowModalNotPremium={isShowModalNotPremium} />
<Modal bind:showModal={isShowModalThereIsPinned}>
    <h3 class="text-center">Ehh, ada postingan kamu yang masih ter-pin. Maksimal hanya bisa 1 pin yaa 🙌</h3>
</Modal>
<Modal bind:showModal={isShowModalAlreadyEdited}>
    <h3 class="text-center">Yahh, kamu ga bisa edit postingan ini lagi karena udah pernah kamu edit sebelumnya 😢</h3>
</Modal>
<ModalEditPostMager bind:isShowModal={isShowModalEditing} data={mager} />
<Modal bind:showModal={isShowModalAlreadyClosed}>
    <h3 class="text-center">Kamu ga perlu close lagi postingan ini lagi karena udah #CLOSED 😉</h3>
</Modal>
<Modal bind:showModal={isShowModalAlreadyCanceled}>
    <h3 class="text-center">Kamu ga perlu membatalkan lagi postingan ini karena udah #CANCELED 😉</h3>
</Modal>
<ModalPostDetail bind:isShowModal={isShowModalPostDetail} data={mager} />
<ModalStillDevelopment bind:isShowModalOnDev={isShowModalOnDev} />

<style lang="postcss">
  .relative ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>