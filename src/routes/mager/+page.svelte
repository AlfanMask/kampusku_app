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
	import { userId } from "../../stores/store";
	import type { Mager } from "../../constants/tables";
	import Searchbar from "$lib/components/ui/Searchbar.svelte";
	import CheckRatingForm from "$lib/components/CheckRatingForm.svelte";

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
	let magerDat: Array<Mager> = [];
	let inputMagerSearch: string = "";
	const getData = async () => {
		magerDat = await fetch("/mager/get_mager_by_user_id?user-id=" + $userId, {method: "GET"}).then((res) => res.json());
	}
	
</script>


{#if isComingFromTelegram}
	<div class="container min-h-screen h-full bg-mager">
		<div class="top flex flex-col p-5 gap-4">
			<Toolbar title="🛵" color="text-white" />
			<Searchbar bind:inputText={inputMagerSearch} placeholder="Cari magermu.." />
		</div>
		<div id="main" class="w-full h-full flex flex-col items-center min-h-screen bg-white rounded-tl-3xl rounded-tr-3xl p-6">
			<div id="past-posts" class="w-full flex flex-col gap-4">
				<h3 class="!text-mager">Postinganmu</h3>
				<div id="posts-list" class="flex flex-col gap-3">
					{#each magerDat as data }
						{#if data.message.toLowerCase().includes(inputMagerSearch.toLowerCase())}
						<PostManageMagerCard mager={data} userId={$userId} />
						{/if}
					{/each}
				</div>
			</div>
	
			<div in:slide out:slide id="btn-order" class="fixed w-full px-10 bottom-[5%] left-1/2 -translate-x-1/2 h-fit flex flex-col gap-2 justify-center z-50">
				<Button text="POSTING" size="lg" bgColor="bg-black" textColor="text-white" on:click={() => goto("/mager/post")} isFullWidth />
					<div class="flex gap-4">
						<Button text="Cek Fee" size="sm" bgColor="bg-white" textColor="text-secondary" on:click={toggleModalCheckFee} isPrimary={false} isFullWidth />
						<Button text="Cek Rating" size="sm" bgColor="bg-white" textColor="text-secondary" on:click={() => { showModalCheckRating = true }} isPrimary={false} isFullWidth />
					</div>
			</div>
		</div>
		<CheckFeeForm bind:showModal={showModalCheckFee} />
		<CheckRatingForm bind:showModal={showModalCheckRating} />
	</div>
{:else}
	<OnlyOpenTroughTelegram />
{/if}


<style lang="postcss">

</style>
