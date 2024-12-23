<script lang="ts">
	import { prevPage } from "../../../helper/back";
	import ModalStillDevelopment from "../modals/ModalStillDevelopment.svelte";
	import Modal from "./Modal.svelte";

    export let title: string;
    export let color: string = "text-primary"; // tailwind color

    // TODO: remove this modal if setting feature already developed
    let isShowModalOnDev: boolean = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="toolbar" class="flex justify-between items-center mt-3 mb-5">
    <i class="fa-solid fa-chevron-left text-2xl {color}" on:click={prevPage}></i>
    <h2 class="!{color}">{title}</h2>
    <i class="fa-solid fa-gear text-2xl {color}" on:click={() => isShowModalOnDev = true}></i>
</div>

<ModalStillDevelopment bind:isShowModalOnDev={isShowModalOnDev} />