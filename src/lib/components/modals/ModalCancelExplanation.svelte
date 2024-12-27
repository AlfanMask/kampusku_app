<script lang='ts'>
	import { slide } from "svelte/transition";
	import type { Mager } from "../../../constants/tables";
	import Modal from "../ui/Modal.svelte";
	import Button from "../ui/Button.svelte";
	import type { FDCancel } from "../../../constants/form_data";
	import { DataType } from "../../../constants/data_types";
    
    export let isShowModal: boolean;
    export let data: Mager;
    let cancelExplanation: string = "";

    $: {
        // hide post_addon
        data = {...data, message: data.message.replace(/(?:Sender:.*|#.*)$/, '').trim()}
    }
    
    let isShowErrorEmptyMessage: boolean = false;
    $: {
        if (cancelExplanation != "") {
            isShowErrorEmptyMessage = false;
        }
    }

    const submit = () => {
        // prevent sending if message is empty
        if (cancelExplanation == "") {
            isShowErrorEmptyMessage = true;
            return
        }
        
        // send back data to telegram bot to edit post
        const sumbmittedData: FDCancel = {
            type: DataType.CANCEL,
            link: data.link,
            cancel_explanation: cancelExplanation,
        }
        window.Telegram.WebApp.sendData(JSON.stringify({ data: sumbmittedData }));
    }
</script>

<Modal bind:showModal={isShowModal}>
    <div id="main" class="w-full h-fit flex flex-col items-center bg-white rounded-tl-3xl rounded-tr-3xl">
        <form id="post-form" class="w-full flex flex-col">
            <div id="input-mager-message" class="form-group">
                <label for="mager-input">Jelaskan Alasan Cancel:</label>
                <textarea name="mager-input" id="mager-input" class="rounded-xl border border-solid p-2" rows="4" bind:value={cancelExplanation}></textarea>
                {#if isShowErrorEmptyMessage}
                    <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Pesan tidak boleh kosong!</span>
                {/if}
            </div>
        </form>

        <div in:slide out:slide id="btn-order" class="w-full mt-8 px-10 h-fit flex justify-center z-50">
            <Button text="KIRIM" size="lg" bgColor="bg-black" textColor="text-white" on:click={submit} isFullWidth />
        </div>
    </div>
</Modal>

<style lang="postcss">
    label {
        @apply text-[16px] text-secondary;
    }
    .form-group {
        @apply flex flex-col gap-2; 
    }
    textarea {
        @apply p-4
    }
    textarea::placeholder {
        @apply !text-sm
    }
</style>