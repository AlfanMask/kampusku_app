<script lang="ts">
	import { onMount } from "svelte";
	import OnlyOpenTroughTelegram from "$lib/components/OnlyOpenTroughTelegram.svelte";
	import MenuCard from "$lib/components/MenuCard.svelte";
	import { goto } from "$app/navigation";
	import Modal from "$lib/components/ui/Modal.svelte";
	import { page } from "$app/stores";
	import { userUniv } from "../stores/store";

	let isComingFromTelegram: boolean = true;
	let userName: string = "";
	onMount(() => {
		// only coming from telegram allowed to use the website
		isComingFromTelegram = window.Telegram.WebApp.platform != 'unknown' ? true : false;
		userName = $page.url.searchParams.get("name") || "";

		// save univ info to store
		const univ = $page.url.searchParams.get("univ") || "UNS"
		userUniv.set(univ)
	});

	let isShowModalOnDev: boolean = false;
	const clickMenuHandler = (url: string) => {
		goto(url)
	}
</script>


{#if isComingFromTelegram}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="min-h-screen h-full bg-base p-5">
		<!-- topbar -->
		<div id="topbar" class="flex justify-between items-center mb-6">
			<div class="flex flex-col gap-1">
				<h2 class="text-primary">Haloo {userName}👋</h2>
				<span class="!text-secondary !text-xs">Penuhi kebutuhanmu dengan kampusku</span>
			</div>
			<i class="fa-solid fa-gear text-2xl text-accent" on:click={() => isShowModalOnDev = true}></i>
		</div>
		
		<!-- menu -->
		<div id="menu-items" class="flex flex-col gap-5">
			<MenuCard title="Menfess 💬" on:click={() => clickMenuHandler('menfess')} desc="Posting pertanyaan seputar kampus di forum besar Kampusku" btnText="Buka" bgImagePath="/img/bgs/bg-menfess.webp" bgGradientCode="--blueish-gradient" />
			<MenuCard title="Mager 🛵" on:click={() => clickMenuHandler('mager')} desc="Butuh jastip atau anjem? Dapatkan bantuan di sini!" btnText="Buka" bgImagePath="/img/bgs/bg-mager.webp" bgGradientCode="--greenish-gradient" />
			<MenuCard title="Shop 🛍" on:click={() => isShowModalOnDev = true} desc="Jual atau beli barang favoritmu di Kampusku Shop.." btnText="Buka" bgImagePath="/img/bgs/bg-shop.webp" bgGradientCode="--orangish-gradient" />
		</div>

		<Modal bind:showModal={isShowModalOnDev}>
			<h3 class="text-center">Maaf, fitur ini masih dalam proses pengembangan. Mohon menggunakan fitur Kampusku lainnya dulu 😊🙌</h3>
		</Modal>
	</div>
{:else}
	<OnlyOpenTroughTelegram />
{/if}


<style lang="postcss">
	
</style>
