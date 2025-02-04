<script lang="ts">
	import { onMount } from "svelte";
	import OnlyOpenTroughTelegram from "$lib/components/OnlyOpenTroughTelegram.svelte";
	import MenuCard from "$lib/components/MenuCard.svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { userId, userUniv, userData, isGrid } from "../stores/store";
	import ModalSetting from "$lib/components/modals/ModalSetting.svelte";
	import type { FacultiesUNS, GENDER } from "../constants/user";
	import { UNIVS } from "../constants/universities";
	import type User from "../constants/user";
	import ModalStillDevelopment from "$lib/components/modals/ModalStillDevelopment.svelte";
	import ModalPremiumInformation from "$lib/components/modals/ModalPremiumInformation.svelte";

	let isComingFromTelegram: boolean = true;
	let userName: string = "";
	export let user_data: User = { user_id: "", univ: UNIVS.UNS, gender: "Loading.." as GENDER, age: 0, faculty: "Loading.." as FacultiesUNS };
	onMount(async () => {
		// only coming from telegram allowed to use the website
		isComingFromTelegram = window.Telegram.WebApp.platform != 'unknown' ? true : false;
		userName = $page.url.searchParams.get("name") || "";

		// save informations to store
		const user_id = $page.url.searchParams.get("user-id") || "";
		userId.set(user_id)
		const univ = $page.url.searchParams.get("univ") || "UNS"
		userUniv.set(univ)
		const isGridPrev = await getIsGridPrev(user_id);
		isGrid.set(isGridPrev)

		// get user profile data
		user_data = await getUserData($userId)
		userData.set(user_data)
	});

	let isShowModalSetting: boolean = false;
	let isShowModalPremiumInformation: boolean = false;
	let isShowModalDevelopment: boolean = false;
	const clickMenuHandler = (url: string) => {
		goto(url)
	}

	const getUserData = async (userId: string): Promise<User> => {
        let result: User = await fetch("/api/users/get/user_by_user_id?user-id=" + userId, { method: "GET" }).then((res) => res.json())
        result = {...result, age: result.age || 0}
        return result;
    }

	const getIsGridPrev = async (userId: string): Promise<boolean> => {
		const isGridPrev = await fetch("/api/users/get/is_grid_preference_by_user_id?user-id=" + userId, {method: "GET"}).then((res) => res.json());
		return isGridPrev;
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
			<div class="flex gap-4">
				<i class="fa-regular fa-circle-dot text-2xl text-menfess" on:click={() => isShowModalPremiumInformation = true}></i>
				<i class="fa-solid fa-gear text-2xl " on:click={() => isShowModalSetting = true}></i>
			</div>
		</div>
		
		<!-- menu -->
		<div id="menu-items" class="flex flex-col gap-5">
			<MenuCard title="Menfess 💬" on:click={() => clickMenuHandler('menfess')} desc="Posting pertanyaan seputar kampus di forum besar Kampusku" btnText="Buka" bgImagePath="/img/bgs/bg-menfess.webp" bgGradientCode="--blueish-gradient" />
			<MenuCard title="Mager 🛵" on:click={() => clickMenuHandler('mager')} desc="Butuh jastip atau anjem? Dapatkan bantuan di sini!" btnText="Buka" bgImagePath="/img/bgs/bg-mager.webp" bgGradientCode="--greenish-gradient" />
			<MenuCard title="Shop 🛍" on:click={() => isShowModalDevelopment = true} desc="Jual atau beli barang favoritmu di Kampusku Shop.." btnText="Buka" bgImagePath="/img/bgs/bg-shop.webp" bgGradientCode="--orangish-gradient" />
		</div>

		<ModalSetting bind:isShowModal={isShowModalSetting} userData={user_data} />
		{#if (user_data.user_id != "" && isShowModalPremiumInformation)}<ModalPremiumInformation bind:isShowModal={isShowModalPremiumInformation} userId={user_data.user_id} />{/if}
		<ModalStillDevelopment bind:isShowModalOnDev={isShowModalDevelopment}  />
	</div>
{:else}
	<OnlyOpenTroughTelegram />
{/if}


<style lang="postcss">
	
</style>
