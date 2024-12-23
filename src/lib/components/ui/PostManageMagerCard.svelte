<script lang="ts">
	import { onMount } from "svelte";
	import { Tables, type Mager } from "../../../constants/tables";
	import { truncateText } from "../../../helper/text";
	import ModalStillDevelopment from "../modals/ModalStillDevelopment.svelte";
	import Modal from "./Modal.svelte";
	import ModalOnlyPremiumAccess from "../modals/ModalOnlyPremiumAccess.svelte";

    export let mager: Mager;
    export let userId: string;

    let isPinned: boolean = false;
    onMount(async () => {
        isPinned = await getIsPinned(Tables.magers, mager.link)
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
    const clickOptionHandler = async (optionType: 'pin' | 'edit' | 'delete' | 'close' | 'cancel') => {
        if (optionType == "pin") {
            const isPremium = await getIsPremium(userId)
            if (!isPremium) {
                isShowModalNotPremium = true
            } else {
                const isAnyPinned = await getIsAnyPinned(userId, mager.table_name)
                if (isAnyPinned) {
                    isShowModalThereIsPinned = true;
                } else {
                    // TODO: send back data to telegram bot
                    console.log("TODO: send back data to telegram bot")
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
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
    id="post-manager-card"
    class="flex justify-between items-center px-4 py-2 rounded-lg border-gray-400 border-solid border relative"
>
    <p>{truncateText(mager.message, 25)}</p>
    <div class="flex gap-2">
        <div class="relative">
            <i class="fa-solid {showDropdown1 ? 'fa-xmark' : 'fa-right-left'} cursor-pointer text-secondary" on:click={() => toggleDropdownHandler('showDropdown1')}></i>
            {#if showDropdown1}
                <div class="absolute right-0 mt-2 border border-gray-300 rounded shadow z-50">
                    <ul class="text-sm bg-white">
                        <li class="px-4 py-2 hover:bg-gray-100 text-gray-500 cursor-pointer" on:click={() => { clickOptionHandler('close') }}>Close</li>
                        <li class="px-4 py-2 hover:bg-gray-100 text-gray-500 cursor-pointer" on:click={() => { clickOptionHandler('cancel') }}>Cancel</li>
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
                        <li class="px-4 py-2 hover:bg-gray-100 text-gray-500 cursor-pointer" on:click={() => { clickOptionHandler('edit') }}>Edit</li>
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
<ModalStillDevelopment bind:isShowModalOnDev={isShowModalOnDev} />

<style lang="postcss">
  .relative ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>