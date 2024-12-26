<script lang='ts'>
	import { slide } from "svelte/transition";
	import type { FessFriends } from "../../../constants/tables";
	import Modal from "../ui/Modal.svelte";
	import Button from "../ui/Button.svelte";
	import type { FDEdit } from "../../../constants/form_data";
	import { DataType } from "../../../constants/data_types";
    
    export let isShowModal: boolean;
    export let data: FessFriends;
    // let editing: string = ""
    $: {
        // hide psot_addon
        data = {...data, message: data.message.replace(/(?:Sender:.*|#.*)$/, '')}
    }

    const submit = () => {
        // send back data to telegram bot to edit post
        const sumbmittedData: FDEdit = {
            type: DataType.EDIT,
            new_msg: data.message,
            link: data.link,
            table: data.table_name,
        }
        window.Telegram.WebApp.sendData(JSON.stringify({ data: sumbmittedData }));
    }
</script>

<Modal bind:showModal={isShowModal}>
    <div id="main" class="w-full h-fit flex flex-col items-center bg-white rounded-tl-3xl rounded-tr-3xl">
        <form id="post-form" class="w-full flex flex-col">
            <div id="input-menfess-message" class="form-group">
                <label for="menfess-input">Edit Pesan:</label>
                <textarea name="menfess-input" id="menfess-input" class="rounded-xl border border-solid p-2" rows="8" bind:value={data.message}></textarea>
            </div>
        </form>

        <p class="!text-secondary mt-2 font-light w-full"><i>ⓘ untuk sekarang hanya bisa kirim menfess berupa teks</i></p>

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