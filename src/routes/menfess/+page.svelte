<script lang="ts">
	import { onMount } from "svelte";
	import OnlyOpenTroughTelegram from "$lib/components/OnlyOpenTroughTelegram.svelte";
	import Toolbar from "$lib/components/ui/Toolbar.svelte";
	import PostManageMenfessCard from "$lib/components/ui/PostManageMenfessCard.svelte";
	import { slide } from "svelte/transition";
	import Button from "$lib/components/ui/Button.svelte";
	import { goto } from "$app/navigation";
	import { userId } from "../../stores/store";
	import type { FessFriends } from "../../constants/tables";
	import Searchbar from "$lib/components/ui/Searchbar.svelte";
	import Spinner from "$lib/components/Spinner.svelte";

	let isComingFromTelegram: boolean = true;
	onMount(() => {
		// only coming from telegram allowed to use the website
		isComingFromTelegram = window.Telegram.WebApp.platform != 'unknown' ? true : false;
		getFessFriendsData()
	});

	// get fess friends data
	let menfessData: Array<FessFriends> = [];
	let inputMenfessSearch: string = "";
	let isLoading: boolean = true;
	const getFessFriendsData = async () => {
		menfessData = await fetch("/menfess/get_fess_friends_by_user_id?user-id=" + $userId, {method: "GET"}).then((res) => res.json());
		isLoading = false;
	}
</script>


{#if isComingFromTelegram}
	<div class="container min-h-screen h-full bg-menfess">
		<div class="top flex flex-col p-5 gap-4">
			<Toolbar title="💬" color="text-white" />
			<Searchbar bind:inputText={inputMenfessSearch} placeholder="Cari menfesmu.." />
		</div>
		<div id="main" class="w-full h-full flex flex-col items-center min-h-screen bg-white rounded-tl-3xl rounded-tr-3xl p-6 pb-32">
			{#if isLoading}
			<Spinner />
			{:else}
			<div id="past-posts" class="w-full flex flex-col gap-4">
				{#if menfessData.length == 0}
				<h3 class="!text-menfess text-center mt-40">Kamu belum punya postingan, silakan buat dengan tombol POSTING di bawah 😊</h3>
				{:else}
				<div class="w-full flex flex-col gap-1">
					<h3 class="!text-menfess">Postinganmu</h3>
					<p class="!text-secondary !text-[10px] font-light w-full"><i>ⓘ maksimal 50 postingan terakhir</i></p>
				</div>
				{/if}
				<div id="posts-list" class="w-full flex flex-col gap-3">
					{#each menfessData as data }
						{#if data.message.toLowerCase().includes(inputMenfessSearch.toLowerCase())}
							<PostManageMenfessCard menfess={data} userId={$userId} />
						{/if}
					{/each}
				</div>
			</div>
	
			<div in:slide out:slide id="btn-order" class="fixed w-full px-10 bottom-[5%] left-1/2 -translate-x-1/2 h-fit flex justify-center z-50">
				<Button text="POSTING" size="lg" bgColor="bg-black" textColor="text-white" on:click={() => goto("/menfess/post")} isFullWidth />
			</div>
			{/if}
		</div>
	</div>
{:else}
	<OnlyOpenTroughTelegram />
{/if}


<style lang="postcss">
</style>
