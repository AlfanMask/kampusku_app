<script lang="ts">
	import { onMount } from "svelte";
    import axios from "axios";
	import OnlyOpenTroughTelegram from "$lib/components/OnlyOpenTroughTelegram.svelte";
	import Toolbar from "$lib/components/ui/Toolbar.svelte";
	import { slide } from "svelte/transition";
	import Button from "$lib/components/ui/Button.svelte";
	import { MAGER } from "../../../constants/post_types";
	import { goto } from "$app/navigation";
	import type { FDMager } from "../../../constants/form_data";
	import { page } from "$app/stores";
	import { userUniv } from "../../../stores/store";
	import FileInput from "$lib/components/FileInput.svelte";
	import { checkFileType } from "../../../helper/check_file";
	import { FileTypes } from "../../../constants/file_types";

	let isComingFromTelegram: boolean = true;
	onMount(() => {
		// only coming from telegram allowed to use the website
		isComingFromTelegram = window.Telegram.WebApp.platform != 'unknown' ? true : false;
	});

    const merchantAppUrl: string = import.meta.env.VITE_MERCHANT_APP_URL;
    const openMerchantAppHandler = () => {
        const merchantAppUrlModified = merchantAppUrl + "&univ=" + $userUniv
        window.location.href = merchantAppUrlModified
    }

    // handling form data
    let isShowErrorEmptyFrom: boolean = false;
    let isShowErrorEmptyDestination: boolean = false;
    let isShowErrorEmptyJastip: boolean = false;
    $: {
        if (data.type == MAGER.ANJEM) {
            if (data.from != "" ) {
                isShowErrorEmptyFrom = false;
            }
            if (data.destination != "" ) {
                isShowErrorEmptyDestination = false;
            }
        }
    }
    let data: FDMager = {
        type: MAGER.ANJEM,
        message: "",
        from: "",
        destination: "",
    }
    $: {
        if (data.message != "") {
            isShowErrorEmptyJastip = false;
        }
    }

    let file: File | null = null;
    let isSending: boolean = false;
    const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = import.meta.env.VITE_CHAT_ID_TO_STORE_ATTACHMENTS;

    const submit = async () => {
        // if anjem -> from & destination shouldn't be empty
        if (data.type == MAGER.ANJEM) {
            if (data.from == "") {
                isShowErrorEmptyFrom = true;
            }
            if (data.destination == "") {
                isShowErrorEmptyDestination = true;
            }

            if (data.from == "" || data.destination == "") {
                return;
            }
        }

        // prevent sending if message is empty if selected jastip
        if ((data.message == "") && (data.type == MAGER.JASTIP)) {
            isShowErrorEmptyJastip = true;
            return
        }
        
        // if contains file to upload -> upload and get the file_id
        let file_id = "";
        if (file) {
            file_id = await uploadFile(file, checkFileType(file));
        }
        
        // send orders data to bot
        window.Telegram.WebApp.sendData(JSON.stringify({ data: {...data, message: data.message?.trim(), attachment_file_id: file_id}, attachment_file_type: file ? checkFileType(file) : "" }));
    }

        // handlers
        const handleFileSelected = (event: CustomEvent<File>) => {
            file = event.detail
        };

        const handleFileRemoved = () => {
            file = null;
        };

        const uploadFile = async (file: File, type: FileTypes): Promise<string> => {
            const formData = new FormData();
            formData.append("chat_id", TELEGRAM_CHAT_ID);
            formData.append(type == FileTypes.image ? "photo" : "video", file);
            const sendType = type == FileTypes.image ? "sendPhoto" : "sendVideo";

            let file_id: string = ""
            try {
                isSending = true;
                const response = await axios.post(
                    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${sendType}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                // get file_id from response and return it
                file_id = type == FileTypes.image ? response.data.result.photo[0].file_id : response.data.result.video.file_id;
            } catch(e) {
                console.error("Error uploading file:", e);
            } finally {
                return file_id;
            }
        };
</script>


{#if isComingFromTelegram}
    <div class="container min-h-screen h-full bg-mager">
        <div class="top flex flex-col p-5 gap-4">
            <Toolbar title="Posting Mager" color="text-white" />
        </div>
        <div id="main" class="w-full h-full flex flex-col items-center min-h-screen bg-white rounded-tl-3xl rounded-tr-3xl p-6">
            <div id="post-form" class="flex flex-col w-full gap-6 mb-4">
                <div id="select-service-container" class="flex items-end justify-between">
                    <div id="select-mager-type" class="form-group flex w-full h-full">
                        <label for="mager-type">Pilih jenis mager</label>
                        <select name="mager-type" id="mager-type" bind:value={data.type}>
                            {#each Object.values(MAGER) as mager}
                                <option value={mager}>{mager}</option>
                            {/each}
                        </select>
                    </div>
                </div>
                <!-- if jastip -> put button to open Merchant App -->
                {#if data.type == MAGER.JASTIP}
                    <Button text="Buka Merchant App 🚀" size="md" bgColor="bg-black" textColor="text-secondary" isSqure={true} isPrimary={false} isFullWidth on:click={openMerchantAppHandler} />
                {/if}
                <!-- if anjem -> make 2 inputs 1 row to for 'from' and 'destination location' -->
                {#if data.type == MAGER.ANJEM}
                    <div class="flex flex-col gap-1">
                        <div class="flex w-full gap-2">
                            <div class="form-group flex flex-col">
                                <label for="mager-input">Lokasi jemput:</label>
                                <input type="text" class="w-full" placeholder="..." bind:value={data.from}>
                                {#if isShowErrorEmptyFrom}
                                    <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Lokasi Jemput tidak boleh kosong!</span>
                                {/if}
                            </div>
                            <div class="form-group flex flex-col">
                                <label for="mager-input">Lokasi antar:</label>
                                <input type="text" class="w-full" placeholder="..." bind:value={data.destination}>
                                {#if isShowErrorEmptyDestination}
                                    <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Lokasi pengantaran tidak boleh kosong!</span>
                                {/if}
                            </div>
                        </div>
                        <p class="w-full opacity-50 mt-2 font-light"><i>ⓘ masukkan daerah saja, tidak perlu spesifik (eg: Gulon, Surya 1, dll)</i></p>
                    </div>
                {/if}
                <div id="input-mager-message" class="form-group flex flex-col">
                    <label for="mager-input">Pesan:</label>
                    {#if isShowErrorEmptyJastip}
                        <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Pesan jastip tidak boleh kosong!</span>
                    {/if}
                    <textarea bind:value={data.message} name="mager-input" id="mager-input" class="rounded-xl border border-solid p-2" rows="{data.type == MAGER.ANJEM ? 4 : 7}" placeholder="{data.type == MAGER.JASTIP ? 'Ketikkan barang/makanan jastip + lokasi pengantaran..' : data.type == MAGER.ANJEM ? 'Masukkan note tambahan jika diperlukan..' : 'Masukkan pesan..'}"></textarea>
                </div>
            </div>

            <FileInput on:fileSelected={handleFileSelected} on:fileRemoved={handleFileRemoved} />
    
            <div class="flex flex-col gap-1 mt-4">
                <p class="!text-secondary mt-2 font-light w-full !m-0"><i>ⓘ kamu bisa reply postingan lain dengan menyalin link postingan tersebut ke kolom pesan di atas</i></p>
                <p class="!text-secondary mt-2 font-light w-full !m-0"><i>ⓘ untuk Cek Fee silakan kembali ke halaman sebelumnya</i></p>
            </div>
    
            <div in:slide out:slide id="btn-order" class="fixed w-full px-10 bottom-[5%] left-1/2 -translate-x-1/2 h-fit flex justify-center z-50">
                <Button text="{isSending ? 'Loading...' : 'KIRIM'}" size="lg" bgColor="bg-black" textColor="text-white" on:click={submit} isFullWidth />
            </div>
        </div>
    </div>
{:else}
	<OnlyOpenTroughTelegram />
{/if}


<style lang="postcss">
    label {
        @apply text-[16px] text-secondary;
    }
    input, select, textarea {
        @apply px-4 py-2 rounded-lg bg-white border border-solid border-secondary;
    }
    option {
        @apply !text-xs font-medium text-secondary;
    }
    .form-group {
        @apply flex flex-col gap-2; 
    }
    textarea {
        @apply p-4
    }
    input::placeholder, textarea::placeholder {
        @apply !text-sm
    }
</style>
