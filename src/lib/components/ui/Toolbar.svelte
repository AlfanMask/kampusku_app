<script lang="ts">
	import { prevPage } from "../../../helper/back";
	import { userData } from "../../../stores/store";
	import ModalPremiumInformation from "../modals/ModalPremiumInformation.svelte";
	import ModalSetting from "../modals/ModalSetting.svelte";
	import ModalStillDevelopment from "../modals/ModalStillDevelopment.svelte";
	import Modal from "./Modal.svelte";
    
    export let title: string;
    export let color: string = "text-primary"; // tailwind color

    let isShowModalSetting: boolean = false;
    let isShowModalPremiumInformation: boolean = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="toolbar" class="flex justify-between items-center mt-3 mb-5">
    <i class="fa-solid fa-chevron-left text-2xl {color}" on:click={prevPage}></i>
    <h2 class="!{color}">{title}</h2>
    <div class="flex gap-4">
        <i class="fa-regular fa-circle-dot text-2xl {color}" on:click={() => isShowModalPremiumInformation = true}></i>
        <i class="fa-solid fa-gear text-2xl {color}" on:click={() => isShowModalSetting = true}></i>
    </div>
</div>

<ModalSetting bind:isShowModal={isShowModalSetting} userData={$userData} />
{#if (isShowModalPremiumInformation)}<ModalPremiumInformation bind:isShowModal={isShowModalPremiumInformation} userId={$userData.user_id} />{/if}