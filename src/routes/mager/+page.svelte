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

	let isComingFromTelegram: boolean = true;
	onMount(() => {
		// only coming from telegram allowed to use the website
		isComingFromTelegram = window.Telegram.WebApp.platform != 'unknown' ? true : false;
	});
	
	// check fee
	let showModalCheckFee: boolean = false;
	const toggleModalCheckFee = () => {
		showModalCheckFee = !showModalCheckFee
	}
	
</script>


{#if isComingFromTelegram}
	<div class="container min-h-screen h-full bg-mager">
		<div class="top flex flex-col p-5 gap-4">
			<Toolbar title="🛵" color="text-white" />
			<Autocomplete baseData={[]} inputText="" placeholder="Cari magermu.." />
		</div>
		<div id="main" class="w-full h-full flex flex-col items-center min-h-screen bg-white rounded-tl-3xl rounded-tr-3xl p-6">
			<div id="past-posts" class="w-full flex flex-col gap-4">
				<h3 class="!text-mager">Postinganmu</h3>
				<div id="posts-list" class="flex flex-col gap-3">
					<PostManageMagerCard text="Masih dalam proses pengembangan.." />
					<PostManageMagerCard text="Masih dalam proses pengembangan.." />
					<PostManageMagerCard text="Masih dalam proses pengembangan.." />
				</div>
			</div>
	
			<div in:slide out:slide id="btn-order" class="fixed w-full px-10 bottom-[5%] left-1/2 -translate-x-1/2 h-fit flex flex-col gap-2 justify-center z-50">
				<Button text="POSTING" size="lg" bgColor="bg-black" textColor="text-white" on:click={() => goto("/mager/post")} isFullWidth />
				<Button text="Cek Fee" size="md" textColor="text-secondary" on:click={toggleModalCheckFee} isPrimary={false} isFullWidth />
			</div>
	
			<Modal bind:showModal={showModalCheckFee}>
				<CheckFeeForm />
			</Modal>
		</div>
	</div>
{:else}
	<OnlyOpenTroughTelegram />
{/if}


<style lang="postcss">

</style>
