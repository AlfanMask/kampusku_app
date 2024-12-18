<script lang="ts">
	import { onMount } from "svelte";
	import OnlyOpenTroughTelegram from "$lib/components/OnlyOpenTroughTelegram.svelte";
	import Toolbar from "$lib/components/ui/Toolbar.svelte";
	import Autocomplete from "$lib/components/ui/Autocomplete.svelte";
	import PostManageMenfessCard from "$lib/components/ui/PostManageMenfessCard.svelte";
	import { slide } from "svelte/transition";
	import Button from "$lib/components/ui/Button.svelte";
	import { goto } from "$app/navigation";

	let isComingFromTelegram: boolean = true;
	onMount(() => {
		// only coming from telegram allowed to use the website
		isComingFromTelegram = window.Telegram.WebApp.platform != 'unknown' ? true : false;
	});
</script>


{#if isComingFromTelegram}
	<div class="container min-h-screen h-full bg-menfess">
		<div class="top flex flex-col p-5 gap-4">
			<Toolbar title="💬" color="text-white" />
			<Autocomplete baseData={[]} inputText="" placeholder="Cari menfesmu.." />
		</div>
		<div id="main" class="w-full h-full flex flex-col items-center min-h-screen bg-white rounded-tl-3xl rounded-tr-3xl p-6">
			<div id="past-posts" class="w-full flex flex-col gap-4">
				<h3 class="!text-menfess">Postinganmu</h3>
				<div id="posts-list" class="w-full flex flex-col gap-3">
					<PostManageMenfessCard text="Masih dalam proses pengembangan.." />
					<PostManageMenfessCard text="Masih dalam proses pengembangan.." />
					<PostManageMenfessCard text="Masih dalam proses pengembangan.." />
				</div>
			</div>
	
			<div in:slide out:slide id="btn-order" class="fixed w-full px-10 bottom-[5%] left-1/2 -translate-x-1/2 h-fit flex justify-center z-50">
				<Button text="POSTING" size="lg" bgColor="bg-black" textColor="text-white" on:click={() => goto("/menfess/post")} isFullWidth />
			</div>
		</div>
	</div>
{:else}
	<OnlyOpenTroughTelegram />
{/if}


<style lang="postcss">
</style>
