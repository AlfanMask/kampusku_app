<script lang="ts">
	import { onMount } from "svelte";
	import OnlyOpenTroughTelegram from "$lib/components/OnlyOpenTroughTelegram.svelte";
	import Toolbar from "$lib/components/ui/Toolbar.svelte";
	import Autocomplete from "$lib/components/ui/Autocomplete.svelte";
	import PostManageCard from "$lib/components/ui/PostManageMenfessCard.svelte";
	import { slide } from "svelte/transition";
	import Button from "$lib/components/ui/Button.svelte";
	import { goto } from "$app/navigation";

	let isComingFromTelegram: boolean = true;
	onMount(() => {
		// only coming from telegram allowed to use the website
		isComingFromTelegram = window.Telegram.WebApp.platform != 'unknown' ? true : true;
	});
</script>


{#if isComingFromTelegram}
	<div class="min-h-screen h-full bg-base p-5">
        <Toolbar title="Shop" />
		<div id="banner">
			<!-- <img src="/img/background.png" alt=""> -->
		</div>
		<div id="categories">
			
		</div>
		<div id="featured-products">

		</div>

        <div in:slide out:slide id="btn-order" class="fixed w-full px-10 bottom-[5%] left-1/2 -translate-x-1/2 h-fit flex justify-center z-50">
            <!-- <Button text="POSTING" size="lg" bgColor="bg-black" textColor="text-white" on:click={} isFullWidth /> -->
        </div>
	</div>
{:else}
	<OnlyOpenTroughTelegram />
{/if}


<style lang="postcss">

</style>
