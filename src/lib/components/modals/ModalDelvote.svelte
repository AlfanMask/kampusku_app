<script lang='ts'>
	import { slide } from "svelte/transition";
	import Modal from "../ui/Modal.svelte";
	import Button from "../ui/Button.svelte";
	import type { FDDelvote } from "../../../constants/form_data";
	import { DataType } from "../../../constants/data_types";
    
    export let isShowModal: boolean;
    let postLink: string = "";
    let isShowErrorEmptyMessage: boolean = false;
    
    $: {
        if (postLink != "") {
            isShowErrorEmptyMessage = false;
        }
    }
    const submit = () => {
        // prevent sending if message is empty
        if (postLink == "") {
            isShowErrorEmptyMessage = true;
            return
        }

        const sumbmittedData: FDDelvote = {
            type: DataType.DELVOTE,
            link: postLink,
        }
        
        // send back data to telegram bot to edit post
        window.Telegram.WebApp.sendData(JSON.stringify({ data: sumbmittedData }));
    }
</script>

<Modal bind:showModal={isShowModal}>
    <div id="main" class="w-full h-fit flex flex-col items-center bg-white rounded-tl-3xl rounded-tr-3xl">
        <form id="post-form" class="w-full flex flex-col">
            <div id="input-delvote-message" class="form-group">
                <label for="delvote-input">Masukkan link postingan:</label>
                <input name="delvote-input" id="delvote-input" class="rounded-xl border border-solid p-2" bind:value={postLink} />
                {#if isShowErrorEmptyMessage}
                    <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Link tidak boleh kosong!</span>
                {/if}
            </div>
        </form>

        <div in:slide out:slide id="btn-order" class="w-full mt-8 px-10 h-fit flex justify-center z-50">
            <Button text="DELVOTE" size="lg" bgColor="bg-black" textColor="text-white" on:click={submit} isFullWidth />
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
    input {
        @apply p-4
    }
    input::placeholder {
        @apply !text-sm
    }
</style>