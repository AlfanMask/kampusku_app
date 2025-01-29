<script lang='ts'>
	import { slide } from "svelte/transition";
	import Modal from "../ui/Modal.svelte";
	import Button from "../ui/Button.svelte";
	import type { FDSendAnonMsg } from "../../../constants/form_data";
	import { DataType } from "../../../constants/data_types";
    
    export let isShowModal: boolean;
    let formData: FDSendAnonMsg = {
        type: DataType.SEND_ANONYMOUS_MESSAGE,
        username: "",
        message: "",
    }
    
    let isShowErrorEmptyMessage: boolean = false;
    let isShowErrorNotValidUsername: boolean = false;
    $: {
        if (formData.message != "") {
            isShowErrorEmptyMessage = false;
        }
    }
    const submit = async () => {
        // prevent sending if message is empty
        if (formData.message == "") {
            isShowErrorEmptyMessage = true;
            return
        }

        // target username should be valid and able to receive anonymous message
        const isValidUsername: boolean = await getIsValidUsername(formData.username);
        if (!isValidUsername) {
            isShowErrorNotValidUsername = true;
            return
        }

        // send back data to telegram bot to edit post
        window.Telegram.WebApp.sendData(JSON.stringify({ data: {...formData, username: formData.username.replace("@", "")} }));
    }

    // apis
    const getIsValidUsername = async (username: string): Promise<boolean> => {
		const isValid = await fetch(`/api/anonymous_messages/get/is_valid_username?username=` + username.replace("@", ""), {method: "GET"}).then((res) => res.json());
        return isValid;
	}
</script>

<Modal bind:showModal={isShowModal}>
    <div id="main" class="w-full h-fit flex flex-col items-center bg-white rounded-tl-3xl rounded-tr-3xl">
        <h3 class="mb-4">Kirim Pesan Anonymous 🫣</h3>
        <form id="post-form" class="w-full flex flex-col gap-2">
            <div id="input-anonmsg-message" class="form-group">
                <label for="anonmsg-input">Username penerima:</label>
                <input name="anonmsg-input" id="anonmsg-input" class="rounded-xl border border-solid p-2" bind:value={formData.username} />
            </div>
            <div id="input-anonmsg-message" class="form-group">
                <label for="anonmsg-input">Pesan:</label>
                <textarea name="anonmsg-input" id="anonmsg-input" class="rounded-xl border border-solid p-2" rows={5} bind:value={formData.message} />
                {#if isShowErrorEmptyMessage}
                    <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Pesan tidak boleh kosong!</span>
                {/if}
            </div>
        </form>

        <div in:slide out:slide id="btn-order" class="w-full mt-8 px-10 h-fit flex justify-center z-50">
            <Button text="KIRIM" size="lg" bgColor="bg-black" textColor="text-white" on:click={submit} isFullWidth />
        </div>
    </div>

    <Modal bind:showModal={isShowErrorNotValidUsername} >
        <h3 class="text-center">Oppss, penerima tidak valid atau bisa jadi dia tidak mau menerima pesan anonymous ☹️</h3>
    </Modal>
</Modal>

<style lang="postcss">
    label {
        @apply text-[16px] text-secondary;
    }
    .form-group {
        @apply flex flex-col gap-2; 
    }
    input {
        @apply p-3
    }
    input::placeholder {
        @apply !text-sm
    }
</style>