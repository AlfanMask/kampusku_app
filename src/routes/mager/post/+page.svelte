<script lang="ts">
	import { onMount } from "svelte";
	import OnlyOpenTroughTelegram from "$lib/components/OnlyOpenTroughTelegram.svelte";
	import Toolbar from "$lib/components/ui/Toolbar.svelte";
	import { slide } from "svelte/transition";
	import Button from "$lib/components/ui/Button.svelte";
	import { MAGER } from "../../../constants/post_types";
	import { goto } from "$app/navigation";
	import type { FDMager } from "../../../constants/form_data";
	import { page } from "$app/stores";
	import { userUniv } from "../../../stores/store";

	let isComingFromTelegram: boolean = true;
	onMount(() => {
		// only coming from telegram allowed to use the website
		isComingFromTelegram = window.Telegram.WebApp.platform != 'unknown' ? true : true;
	});

    const merchantAppUrl: string = import.meta.env.VITE_MERCHANT_APP_URL;
    const openMerchantAppHandler = () => {
        const merchantAppUrlModified = merchantAppUrl + "&univ=" + $userUniv
        window.location.href = merchantAppUrlModified
    }

    // handling form data
    let isShowErrorEmptyFrom: boolean = false;
    let isShowErrorEmptyDestination: boolean = false;
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
    const submit = () => {
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
        
        // send orders data to bot
        window.Telegram.WebApp.sendData(JSON.stringify({ data: {...data, message: data.message?.trim()} }));
    }
</script>


{#if isComingFromTelegram}
    <div class="container min-h-screen h-full bg-mager">
        <div class="top flex flex-col p-5 gap-4">
            <Toolbar title="Posting Mager" color="text-white" />
        </div>
        <div id="main" class="w-full h-full flex flex-col items-center min-h-screen bg-white rounded-tl-3xl rounded-tr-3xl p-6">
            <div id="post-form" class="flex flex-col w-full gap-6">
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
                    <textarea bind:value={data.message} name="mager-input" id="mager-input" class="rounded-xl border border-solid p-2" rows="10" placeholder="{data.type == MAGER.JASTIP ? 'Ketikkan barang/makanan jastip + lokasi pengantaran..' : data.type == MAGER.ANJEM ? 'Masukkan note tambahan jika diperlukan..' : 'Masukkan pesan..'}"></textarea>
                </div>
            </div>
    
            <p class="w-full opacity-50 mt-2 font-light"><i>ⓘ jangan lupa Cek Fee di halaman sebelumnya</i></p>
    
            <div in:slide out:slide id="btn-order" class="fixed w-full px-10 bottom-[5%] left-1/2 -translate-x-1/2 h-fit flex justify-center z-50">
                <Button text="KIRIM " size="lg" bgColor="bg-black" textColor="text-white" on:click={submit} isFullWidth />
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
    input, select {
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
