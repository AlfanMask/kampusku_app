<script lang="ts">
	import { onMount } from "svelte";
	import OnlyOpenTroughTelegram from "$lib/components/OnlyOpenTroughTelegram.svelte";
	import Toolbar from "$lib/components/ui/Toolbar.svelte";
	import Autocomplete from "$lib/components/ui/Autocomplete.svelte";
	import PostManageMagerCard from "$lib/components/ui/PostManageMagerCard.svelte";
	import { slide } from "svelte/transition";
	import Button from "$lib/components/ui/Button.svelte";
	import { goto } from "$app/navigation";
	import Modal from "$lib/components/ui/Modal.svelte";
	import { MAGER } from "../../constants/post_types";
	import { calculatePrice } from "../../helper/numbers";
	import CheckFeeForm from "$lib/components/CheckFeeForm.svelte";
	import { userId, isGrid } from "../../stores/store";
	import type { Mager } from "../../constants/tables";
	import Searchbar from "$lib/components/ui/Searchbar.svelte";
	import CheckRatingForm from "$lib/components/CheckRatingForm.svelte";
	import Spinner from "$lib/components/Spinner.svelte";
	import PostManageMagerCardBox from "$lib/components/ui/PostManageMagerCardBox.svelte";
	import SwitchPreview from "$lib/components/ui/SwitchPreview.svelte";

	let isComingFromTelegram: boolean = true;
	onMount(() => {
		// only coming from telegram allowed to use the website
		isComingFromTelegram = window.Telegram.WebApp.platform != 'unknown' ? true : false;

		getData()
	});
	
	// modals
	let showModalCheckFee: boolean = false;
	let showModalCheckRating: boolean = false;
	const toggleModalCheckFee = () => {
		showModalCheckFee = !showModalCheckFee
	}

	// get mager data
	let magerData: Array<Mager> = [];
	let inputMagerSearch: string = "";
	let isLoading: boolean = true;
	const getData = async () => {
		magerData = await fetch("/api/magers/get/mager_by_user_id?user-id=" + $userId, {method: "GET"}).then((res) => res.json());
		isLoading = false;
	}
</script>


{#if isComingFromTelegram}
	<div class="container min-h-screen h-full bg-mager">
		<div class="top flex flex-col p-5 gap-4">
			<Toolbar title="🛵" color="text-white" />
			<Searchbar bind:inputText={inputMagerSearch} placeholder="Cari magermu.." />
		</div>
		<div id="main" class="w-full h-full flex flex-col items-center min-h-screen bg-white rounded-tl-3xl rounded-tr-3xl p-6 pb-40">
			{#if isLoading}
			<Spinner />
			{:else}
			<div id="past-posts" class="w-full flex flex-col gap-4">
				{#if magerData.length == 0}
				<h3 class="!text-mager text-center mt-40">Kamu belum punya postingan, silakan buat dengan tombol POSTING di bawah 😊</h3>
				{:else}
				<div class="w-full flex justify-between items-end">
					<div class="w-full flex flex-col">
					<h3 class="!text-mager">Postinganmu</h3>
						<p class="!text-secondary !text-[10px] font-light w-full"><i>ⓘ maksimal 50 postingan terakhir</i></p>
					</div>
					<SwitchPreview firstItem="fa-solid fa-list" secondItem="fa-solid fa-grip-vertical" />
				</div>
				{/if}
				{#if (!$isGrid)}
				<div id="posts-list" class="w-full flex flex-col gap-3">
					{#each magerData as data }
						{#if data.message.toLowerCase().includes(inputMagerSearch.toLowerCase())}
						<PostManageMagerCard mager={data} userId={$userId} />
						{/if}
					{/each}
				</div>
				{:else}
				<div id="posts-grid" class="w-full grid grid-cols-2 gap-3">
					{#each magerData as data }
						{#if data.message.toLowerCase().includes(inputMagerSearch.toLowerCase())}
						<PostManageMagerCardBox mager={data} userId={$userId} />
						{/if}
					{/each}
				</div>
				{/if}
			</div>
	
			<div in:slide out:slide id="btn-order" class="fixed w-full px-10 bottom-[5%] left-1/2 -translate-x-1/2 h-fit flex flex-col gap-2 justify-center z-50">
				<Button text="POSTING" size="lg" bgColor="bg-black" textColor="text-white" on:click={() => goto("/mager/post")} isFullWidth />
					<div class="flex gap-4">
						<Button text="Cek Fee" size="sm" bgColor="bg-white" textColor="text-secondary" on:click={toggleModalCheckFee} isPrimary={false} isFullWidth />
						<Button text="Cek Rating" size="sm" bgColor="bg-white" textColor="text-secondary" on:click={() => { showModalCheckRating = true }} isPrimary={false} isFullWidth />
					</div>
			</div>
			{/if}
		</div>
		<CheckFeeForm bind:showModal={showModalCheckFee} />
		<CheckRatingForm bind:showModal={showModalCheckRating} />
	</div>
{:else}
	<OnlyOpenTroughTelegram />
{/if}


<style lang="postcss">

</style>
