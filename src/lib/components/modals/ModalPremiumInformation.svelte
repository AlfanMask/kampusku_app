<script lang='ts'>
	import { onMount } from "svelte";
	import Modal from "../ui/Modal.svelte";
	import type Premiums from "../../../constants/premiums";
	import type Quotas from "../../../constants/quotas";
	import IconText from "../ui/IconText.svelte";
    
    export let isShowModal: boolean;
    export let userId: string;

    let premiums: Premiums = {premium_menfess: "-", premium_anon: "-", premium_driver: "-" }
    let quotas: Quotas = { special_quota: 0, bid_quota: 0 }

    onMount( async() => {
        premiums = await getPremiumInformation(userId);
        quotas = await getQuotaInformation(userId);
    })

    // apis
    const getPremiumInformation = async (userId: string) => {
        const result: Premiums = await fetch(`/api/users/get/all_premiums_by_user_id?user-id=` + userId, {method: "GET"}).then((res) => res.json());
        return result;
    }
    const getQuotaInformation = async (userId: string) => {
        const result: Quotas = await fetch(`/api/users/get/all_quotas_by_user_id?user-id=` + userId, {method: "GET"}).then((res) => res.json());
        return result;
    }
</script>

<Modal bind:showModal={isShowModal}>
    <div id="main" class="w-full h-fit flex flex-col items-center bg-white rounded-tl-3xl rounded-tr-3xl gap-10 pb-2">
        <div id="section-1" class="w-full flex flex-col items-center gap-2">
            <h3 class="mb-2">Premium Kamu</h3>
            <div class="w-full flex justify-center gap-4">
                <IconText icon="fa-solid fa-comments" bgColor="bg-menfess" description="Menfess" description2={premiums.premium_menfess}/>
                <IconText icon="fa-solid fa-people-arrows" bgColor="bg-menfess" description="Anon" description2={premiums.premium_anon} />
                <IconText icon="fa-solid fa-person-biking" bgColor="bg-menfess" description="Driver" description2={premiums.premium_driver} />
            </div>
        </div>
        <div id="section-2" class="w-full flex flex-col items-center gap-2">
            <div class="flex flex-col items-center mb-2">
                <h3 class="">Kuota Kamu</h3>
                <span class="!text-secondary !text-[10px]"><i>(Otomatis direset tiap Senin)</i></span>
            </div>
            <div class="w-full flex justify-center gap-4">
                <IconText icon="fa-solid fa-paper-plane" bgColor="bg-mager" description="Posting" description2={quotas.special_quota.toString()}/>
                <IconText icon="fa-solid fa-location-crosshairs" bgColor="bg-mager" description="Bid" description2={quotas.bid_quota.toString()} />
            </div>
        </div>
    </div>
</Modal>