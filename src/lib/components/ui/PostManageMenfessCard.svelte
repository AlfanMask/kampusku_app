<script lang="ts">
	import { truncateText } from "../../../helper/text";
	import Modal from "./Modal.svelte";

    export let text: string;

    let showDropdown = false;
    function toggleDropdown() {
        showDropdown = !showDropdown;
    }

    // TODO: remove this modal if setting feature already developed
    let isShowModalOnDev: boolean = false;
    const clickOptionHandler = (optionType: 'pin' | 'edit' | 'delete') => {
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
    class="flex justify-between w-full items-center px-4 py-2 rounded-lg border-gray-400 border-solid border relative"
>
    <p class="!text-secondary !text-xs relative z-0">{truncateText(text, 35)}</p>
    <div class="relative">
        <i class="fa-solid {showDropdown ? 'fa-xmark' : 'fa-bars'} cursor-pointer text-secondary" on:click={toggleDropdown}></i>
        {#if showDropdown}
            <div class="absolute right-0 mt-2 border border-secondary rounded shadow z-50">
                <ul class="text-sm bg-white">
                    <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" on:click={() => { clickOptionHandler('pin') }}>Pin</li>
                    <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" on:click={() => { clickOptionHandler('edit') }}>Edit</li>
                    <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" on:click={() => { clickOptionHandler('delete') }}>Hapus</li>
                </ul>
            </div>
        {/if}
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