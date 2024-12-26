<script lang="ts">
	import { onMount } from "svelte";
	import OnlyOpenTroughTelegram from "$lib/components/OnlyOpenTroughTelegram.svelte";
	import Toolbar from "$lib/components/ui/Toolbar.svelte";
	import { slide } from "svelte/transition";
	import Button from "$lib/components/ui/Button.svelte";
	import { MENFESS } from "../../../constants/post_types";
	import type { FDMenfess } from "../../../constants/form_data";

	let isComingFromTelegram: boolean = true;
	onMount(() => {
		// only coming from telegram allowed to use the website
		isComingFromTelegram = window.Telegram.WebApp.platform != 'unknown' ? true : false;
	});

    // handling form data
    let isShowErrorEmptyMessage: boolean = false;
    let data: FDMenfess = {
        type: MENFESS.MENFESS_BIASA,
        message: "",
    }
    $: {
        if (data.message != "") {
            isShowErrorEmptyMessage = false;
        }
    }
    const submit = () => {
        // prevent sending if message is empty
        if (data.message == "") {
            isShowErrorEmptyMessage = true;
            return
        }
        
        // send orders data to bot
        window.Telegram.WebApp.sendData(JSON.stringify({ data }));
    }
</script>


{#if isComingFromTelegram}
    <div class="container min-h-screen h-full bg-menfess">
        <div class="top flex flex-col p-5 gap-4">
            <Toolbar title="Posting Menfess" color="text-white" />
        </div>
        <div id="main" class="w-full h-full flex flex-col items-center min-h-screen bg-white rounded-tl-3xl rounded-tr-3xl p-6">
            <form id="post-form" class="w-full flex flex-col gap-4">
                <div id="select-menfess-type" class="form-group">
                    <label for="menfess-type">Pilih jenis menfess:</label>
                    <select name="menfess-type" id="menfess-type" bind:value={data.type}>
                        {#each Object.values(MENFESS) as menfess}
                            <option value={menfess}>{menfess}</option>
                        {/each}
                    </select>
                </div>
                <div id="input-menfess-message" class="form-group">
                    <label for="menfess-input">Pesan:</label>
                    {#if isShowErrorEmptyMessage}
                        <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Pesan tidak boleh kosong!</span>
                    {/if}
                    <textarea name="menfess-input" id="menfess-input" class="rounded-xl border border-solid p-2" rows="10" bind:value={data.message}></textarea>
                </div>
            </form>
    
            <p class="!text-secondary mt-2 font-light w-full"><i>ⓘ untuk sekarang hanya bisa kirim menfess berupa teks</i></p>
    
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
