<script lang="ts">
	import { DRIVER_RATING_SERVICES, RATINGS, type DRIVER_RATINGS_POINT } from "../../constants/ratings";
	import Button from "./ui/Button.svelte";
	import Modal from "./ui/Modal.svelte";

    export let showModal: boolean;
    
    let typeSelected: RATINGS = RATINGS.DRIVER;
    let serviceSelected: DRIVER_RATING_SERVICES | null;
    let inputUsername: string = "";
    
    let ratingResult: DRIVER_RATINGS_POINT|null = null;
    let stars: string = '🌟'.repeat(0)

    $: {
        // if decimal, get only max first 3 digits
        if (ratingResult?.point.toString().includes('.')) {
            const trimmedPoint = parseFloat(ratingResult.point.toString().slice(0, 3));
            ratingResult = {...ratingResult, point: trimmedPoint}
            stars = '🌟'.repeat(Math.round(trimmedPoint))
        } else {
            stars = '🌟'.repeat(Math.round(ratingResult?.point ?? 0))
        }
    }
    
    const resetRatingResult = () => {
        ratingResult = null;
    }

    const findRating = async (type: RATINGS, username: string) => {
        if (type == RATINGS.DRIVER) {
            ratingResult = await getRatingDriver(serviceSelected || DRIVER_RATING_SERVICES.ALL_AVG, username.replaceAll("@", ""))
        } else if (type == RATINGS.CUSTOMER) {
            ratingResult = await getRatingCustomer(serviceSelected || DRIVER_RATING_SERVICES.ALL_AVG, username.replaceAll("@", ""))
        }
    }

    const getRatingDriver = async (service: DRIVER_RATING_SERVICES, username: string) => {
        const result: DRIVER_RATINGS_POINT = await fetch("/api/magers/get/ratings/driver_rating/?service=" + encodeURIComponent(service) + "&username=" + encodeURIComponent(username), { method: "GET" }).then((res) => res.json()) 
        return result;
    }

    const getRatingCustomer = async (service: DRIVER_RATING_SERVICES, username: string) => {
        const result: DRIVER_RATINGS_POINT = await fetch("/api/magers/get/ratings/customer_rating/?service=" + encodeURIComponent(service) + "&username=" + encodeURIComponent(username), { method: "GET" }).then((res) => res.json()) 
        return result;
    }

    console.log("ratingResult: ", ratingResult)
</script>

<Modal bind:showModal>
    <div class="!ml-4 flex flex-col gap-4">
        <h2>Cek Rating 🔎</h2>
        <div id="check-fee" class="w-full flex flex-col gap-6 mt-2">
            <div class="flex w-full flex-col gap-2">
                <div id="select-person-type" class="form-group">
                    <label for="person-type">Pilih jenis rating</label>
                    <select name="person-type" id="person-type" bind:value={typeSelected}>
                        <option value={RATINGS.DRIVER}>{RATINGS.DRIVER}</option>
                        <option value={RATINGS.CUSTOMER}>{RATINGS.CUSTOMER}</option>
                    </select>
                </div>
                <div id="input-username" class="form-group">
                    <label for="person-username">Username:</label>
                    <input type="text" bind:value={inputUsername}>
                </div>
                <div id="select-service" class="form-group">
                    <label for="service-type">Pilih layanan</label>
                    <select name="service-type" id="service-type" bind:value={serviceSelected} on:change={resetRatingResult}>
                        <option value={DRIVER_RATING_SERVICES.ANJEM}>{DRIVER_RATING_SERVICES.ANJEM}</option>
                        <option value={DRIVER_RATING_SERVICES.JASTIP}>{DRIVER_RATING_SERVICES.JASTIP}</option>
                        <option value={DRIVER_RATING_SERVICES.ALL_AVG}>{DRIVER_RATING_SERVICES.ALL_AVG}</option>
                    </select>
                </div>
                <div class="mt-2">
                    <Button text="Cek" size="md" bgColor="bg-white" textColor="text-secondary" on:click={() => findRating(typeSelected, inputUsername)} isPrimary={false} isFullWidth />
                </div>
            </div>
            <hr>
            <div class="w-full flex justify-between">
            {#if ratingResult}
                {#if ratingResult?.is_registered && (ratingResult.num_rater > 0)}
                    <h3 class="!text-mager">{serviceSelected ? serviceSelected + ":" : "Rating:"}</h3>
                    <div class="flex flex-col items-end gap-1">
                            <!-- if popular place is selected -> put fee using it's fee -->
                            <h3 class="!text-mager !text-xl">{stars} ({ratingResult.point})</h3>
                            <span class="!text-xs !text-secondary">({ratingResult.num_rater} orang)</span>
                    </div>
                {:else if ratingResult?.is_registered && (ratingResult.num_rater == 0)}
                    <div class="w-full flex flex-col items-center gap-2">
                        <h3 class="text-center">🥲</h3>
                        <span class="!text-red-500 text-center">Opps, driver ini belum punya rating</span>
                    </div>
                {:else if !ratingResult?.is_registered}
                    <div class="flex flex-col items-center gap-2">
                        <h3>⚠️</h3>
                        <span class="!text-red-500 text-center">Opps, orang ini bukan driver. Harap hati-hati!</span>
                    </div>
                {/if}
            {/if}
            </div>
        </div>
    </div>
</Modal>

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
        @apply w-full flex flex-col gap-1; 
    }
    textarea {
        @apply p-4
    }
    input::placeholder, textarea::placeholder {
        @apply !text-sm
    }
</style>