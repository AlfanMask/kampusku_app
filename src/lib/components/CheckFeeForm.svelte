<script lang="ts">
	import type { MerchantFee } from "../../constants/fees";
	import { MAGER } from "../../constants/post_types";
	import { calculatePrice } from "../../helper/numbers";
	import Autocomplete from "./ui/Autocomplete.svelte";
    import merchantsData from "../../data/merchant_fee_list.json";
    import popularPlacesData from "../../data/popular_places_fee_list.json";
	import { formatRupiah } from "../../helper/formatter";

    let serviceSelected: MAGER = MAGER.ANJEM;
    let activeMerchant: MerchantFee = {is_parkir_free: false} as MerchantFee;
    let merchantInput: string = ""
    let popularPlacesInput: string = ""
	let distance: number = 0;
	let totalFee: number = 0;
    $: {
        // if input text is matched with merchant name then select merchant
        if (merchantInput) {
            activeMerchant = merchantsData.find(o => o.name == merchantInput) as MerchantFee || {is_parkir_free: false} as MerchantFee;
        }
    }
    $: {
        // reset popular places input
        if(serviceSelected == MAGER.JASTIP) {
            popularPlacesInput = ""
        }
    }
	$: {
        if (activeMerchant.id) {
            const parkir_fee = activeMerchant?.is_parkir_free ? 0 : 2000;
            totalFee = calculatePrice(distance) + activeMerchant?.addon_fee + parkir_fee
        } else {
            totalFee = calculatePrice(distance)
        }
	}

</script>

<div class="!ml-4 flex flex-col gap-4">
    <h2>Cek Fee 🔎</h2>
    <div id="check-fee" class="w-full flex flex-col gap-6 mt-2">
        <div class="flex w-full flex-col gap-2">
            <div id="select-service" class="form-group">
                <label for="mager-type">Pilih jenis layanan</label>
                <select name="mager-type" id="mager-type" bind:value={serviceSelected}>
                    <option value={MAGER.ANJEM}>{MAGER.ANJEM}</option>
                    <option value={MAGER.JASTIP}>{MAGER.JASTIP}</option>
                </select>
            </div>
            <!-- show merchant list if service selected is JASTIP -->
            {#if serviceSelected == MAGER.JASTIP}
                <!-- TODO: show merchant based on user's univ -->
                <Autocomplete baseData={merchantsData.map(o => o.name)} bind:inputText={merchantInput} placeholder="Cari merchant.." isSqure={true} />
                <p class="w-full opacity-25 font-light ml-1"><i>nb: kosongi jika tidak menemukan merchant</i></p>
            {/if}
            <!-- show popular places list if service selected is ANJEM -->
            {#if serviceSelected == MAGER.ANJEM}
                <!-- TODO: show merchant based on user's univ -->
                <Autocomplete baseData={popularPlacesData.map(o => o.name)} bind:inputText={popularPlacesInput} placeholder="Cari lokasi populer.." isSqure={true} />
                <p class="w-full opacity-25 font-light ml-1"><i>nb: kosongi jika tidak menemukan lokasi</i></p>
            {/if}
        </div>
        <div id="input-dinstance" class="form-group">
            <label for="distance-input">Jarak (dalam meter):</label>
            <input type="number" bind:value={distance}>
        </div>
        <hr>
        <div class="w-full flex justify-between">
            <h3 class="!text-mager">Fee:</h3>
            <div class="flex flex-col items-end">
                <!-- if popular place is selected -> put fee using it's fee -->
                <h3 class="!text-mager">{popularPlacesInput != "" ? formatRupiah(popularPlacesData.find(o => o.name == popularPlacesInput)?.fee || 0) : formatRupiah(totalFee)}</h3>
                <span class="!text-xs !text-secondary">{activeMerchant.id && !activeMerchant.is_parkir_free ? '(termasuk parkir)' : ''}</span>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    label {
        @apply text-[16px] text-secondary w-full;
    }
    input, select {
        @apply px-4 py-2 w-full rounded-lg bg-white border border-solid border-secondary;
    }
    option {
        @apply !text-xs w-full font-medium text-secondary;
    }
    .form-group {
        @apply w-full flex flex-col gap-2; 
    }
    textarea {
        @apply p-4
    }
    input::placeholder, textarea::placeholder {
        @apply !text-sm
    }
</style>