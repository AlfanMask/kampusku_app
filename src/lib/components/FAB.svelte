<script lang="ts">
	import { fly, slide } from "svelte/transition";
	import type FabItem from "../../constants/fab_item";

    export let btnList: Array<FabItem>;
    export let color: string = "bg-gray-400"; // tailwind color

    let isOpen: boolean = false;
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div in:slide out:slide id="fab" on:click={() => {isOpen = !isOpen}} class="fixed bottom-[4%] right-6 flex justify-center items-center z-50 w-14 h-14 {isOpen ? 'bg-gray-400' : color} rounded-full shadow-lg cursor-pointer">
    <i id="main" class="!text-white {isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-plus'}"></i>
</div>
{#if isOpen}
<div in:fly={{ y: 100, duration: 500 }} out:fly={{ y: 100, duration: 500 }} class="fixed flex-col bottom-[12%] right-6">
    {#each btnList as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div in:slide out:slide on:click={item.onClick} class="flex justify-center items-center mb-2 z-50 w-14 h-14 {color} rounded-full shadow-lg cursor-pointer">
            <i class="{item.icon} text-white"/>
        </div>
    {/each}
</div>
{/if}


<style lang="postcss">
</style>