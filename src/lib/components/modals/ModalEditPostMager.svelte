<script lang='ts'>
	import { slide } from "svelte/transition";
	import type { Mager } from "../../../constants/tables";
	import Modal from "../ui/Modal.svelte";
	import Button from "../ui/Button.svelte";
    
    export let isShowModal: boolean;
    export let data: Mager;

    const submit = () => {
        // TODO: send back data to telegram bot to edit post
        console.log("// TODO: send back data to telegram bot to edit post");
    }
</script>

<Modal bind:showModal={isShowModal}>
    <div id="main" class="w-full h-fit flex flex-col items-center bg-white rounded-tl-3xl rounded-tr-3xl">
        <form id="post-form" class="w-full flex flex-col">
            <div id="input-mager-message" class="form-group">
                <label for="mager-input">Edit Pesan:</label>
                <textarea name="mager-input" id="mager-input" class="rounded-xl border border-solid p-2" rows="8" bind:value={data.message}></textarea>
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