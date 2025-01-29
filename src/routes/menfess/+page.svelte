<script lang="ts">
	import { onMount } from "svelte";
	import OnlyOpenTroughTelegram from "$lib/components/OnlyOpenTroughTelegram.svelte";
	import Toolbar from "$lib/components/ui/Toolbar.svelte";
	import PostManageMenfessCard from "$lib/components/ui/PostManageMenfessCard.svelte";
	import { slide } from "svelte/transition";
	import Button from "$lib/components/ui/Button.svelte";
	import { goto } from "$app/navigation";
	import { userId, isGrid } from "../../stores/store";
	import type { FessFriends } from "../../constants/tables";
	import Searchbar from "$lib/components/ui/Searchbar.svelte";
	import Spinner from "$lib/components/Spinner.svelte";
	import PostManageMenfessCardBox from "$lib/components/ui/PostManageMenfessCardBox.svelte";
	import SwitchPreview from "$lib/components/ui/SwitchPreview.svelte";
	import Fab from "$lib/components/FAB.svelte";
	import type FabItem from "../../constants/fab_item";
	import ModalStillDevelopment from "$lib/components/modals/ModalStillDevelopment.svelte";

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
		menfessData = await fetch("/api/fess/get/fess_friends_by_user_id?user-id=" + $userId, {method: "GET"}).then((res) => res.json());
		isLoading = false;
	}

	// fab buttons
	const postingHandler = () => {
		goto("/menfess/post")
	}
	let isShowModalDevelopment: boolean = false;
	const delvoteHandler = () => {
		// TODO: delvote feature
		console.log("TODO: delvote feature")
		isShowModalDevelopment = true;
	}
	const btnList: Array<FabItem> = [
		{icon: "fa-solid fa-pencil", onClick: postingHandler},
        {icon: "fa-solid fa-square-poll-vertical", onClick: delvoteHandler},
	]
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
				<h3 class="!text-menfess text-center mt-40">Kamu belum punya postingan, silakan buat dengan tombol di bawah 😊</h3>
				{:else}
				<div class="w-full flex justify-between items-end">
					<div class="w-full flex flex-col">
						<h3 class="!text-menfess">Postinganmu</h3>
						<p class="!text-secondary !text-[10px] font-light w-full"><i>ⓘ maksimal 50 postingan terakhir</i></p>
					</div>
					<SwitchPreview firstItem="fa-solid fa-list" secondItem="fa-solid fa-grip-vertical" />
				</div>
				{/if}
				{#if (!$isGrid)}
				<div id="posts-list" class="w-full flex flex-col gap-3">
					{#each menfessData as data }
						{#if data.message.toLowerCase().includes(inputMenfessSearch.toLowerCase())}
							<PostManageMenfessCard menfess={data} userId={$userId} />
						{/if}
					{/each}
				</div>
				{:else}
				<div id="posts-grid" class="w-full grid grid-cols-2 gap-3">
					{#each menfessData as data }
						{#if data.message.toLowerCase().includes(inputMenfessSearch.toLowerCase())}
							<PostManageMenfessCardBox menfess={data} userId={$userId} />
						{/if}
					{/each}
				</div>
				{/if}
			</div>
	
			<Fab btnList={btnList} color="bg-menfess" />
			{/if}
		</div>
	</div>
	<ModalStillDevelopment bind:isShowModalOnDev={isShowModalDevelopment}  />
{:else}
	<OnlyOpenTroughTelegram />
{/if}


<style lang="postcss">
	#switch i {
        @apply text-gray-300;
    }
    #switch .active {
        @apply text-secondary;
    }
</style>
