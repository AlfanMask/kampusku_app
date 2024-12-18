<script lang="ts">
	import { truncateText } from "../../../helper/text";
	import Modal from "./Modal.svelte";

    export let text: string;

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
    const clickOptionHandler = (optionType: 'close' | 'cancel' |'pin' | 'edit' | 'delete') => {
        // TODO: ...
        isShowModalOnDev = !isShowModalOnDev;
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
    <p>{truncateText(text, 25)}</p>
    <div class="flex gap-2">
        <div class="relative">
            <i class="fa-solid {showDropdown1 ? 'fa-xmark' : 'fa-right-left'} cursor-pointer text-secondary" on:click={() => toggleDropdownHandler('showDropdown1')}></i>
            {#if showDropdown1}
                <div class="absolute right-0 mt-2 border border-gray-300 rounded shadow z-50">
                    <ul class="text-sm bg-white">
                        <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" on:click={() => { clickOptionHandler('close') }}>Close</li>
                        <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" on:click={() => { clickOptionHandler('cancel') }}>Cancel</li>
                    </ul>
                </div>
            {/if}
        </div>
        <div class="relative">
            <i class="fa-solid {showDropdown2 ? 'fa-xmark' : 'fa-bars'} cursor-pointer text-secondary" on:click={() => toggleDropdownHandler('showDropdown2')}></i>
            {#if showDropdown2}
                <div class="absolute right-0 mt-2 border border-gray-300 rounded shadow z-50">
                    <ul class="text-sm bg-white">
                        <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" on:click={() => { clickOptionHandler('pin') }}>Pin</li>
                        <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" on:click={() => { clickOptionHandler('edit') }}>Edit</li>
                        <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" on:click={() => { clickOptionHandler('delete') }}>Hapus</li>
                    </ul>
                </div>
            {/if}
        </div>
    </div>
</div>
<Modal bind:showModal={isShowModalOnDev}>
    <h3 class="text-center">Maaf, fitur ini masih dalam proses pengembangan. Mohon menggunakan fitur Kampusku lainnya dulu 😊🙌</h3>
</Modal>

<style lang="postcss">
  .relative ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>