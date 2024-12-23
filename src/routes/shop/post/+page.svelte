<script lang="ts">
	import { onMount } from "svelte";
	import OnlyOpenTroughTelegram from "$lib/components/OnlyOpenTroughTelegram.svelte";
	import Toolbar from "$lib/components/ui/Toolbar.svelte";
	import { slide } from "svelte/transition";
	import Button from "$lib/components/ui/Button.svelte";
	import { MENFESS } from "../../../constants/post_types";

	let isComingFromTelegram: boolean = true;
	onMount(() => {
		// only coming from telegram allowed to use the website
		isComingFromTelegram = window.Telegram.WebApp.platform != 'unknown' ? true : true;
	});
</script>


{#if isComingFromTelegram}
	<div class="min-h-screen h-full bg-base p-5">
        <Toolbar title="Posting Menfess" />

        <form id="post-form" class="flex flex-col gap-4 mt-10">
            <div id="select-menfess-type" class="form-group flex flex-col">
                <label for="menfess-type">Pilih jenis menfess</label>
                <select name="menfess-type" id="menfess-type">
                    {#each Object.values(MENFESS) as menfess}
                        <option value={menfess}>{menfess}</option>
                    {/each}
                </select>
            </div>
            <div id="input-menfess-message" class="form-group flex flex-col">
                <label for="menfess-input">Masukkan pesan:</label>
                <textarea name="menfess-input" id="menfess-input" class="rounded-xl border border-solid p-2" rows="15"></textarea>
            </div>
        </form>

        <p class="opacity-50 mt-5 font-light"><i>nb: untuk sekarang hanya bisa kirim menfess berupa teks</i></p>

        <div in:slide out:slide id="btn-order" class="fixed w-full px-10 bottom-[5%] left-1/2 -translate-x-1/2 h-fit flex justify-center z-50">
            <Button text="KIRIM " size="lg" bgColor="bg-black" textColor="text-white" on:click={() => {}} isFullWidth />
        </div>
	</div>
{:else}
	<OnlyOpenTroughTelegram />
{/if}


<style lang="postcss">

</style>
