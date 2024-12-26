<script lang='ts'>
	import { slide } from "svelte/transition";
	import Modal from "../ui/Modal.svelte";
	import Button from "../ui/Button.svelte";
	import { removeHTMLElements } from "../../../helper/text";
	import type User from "../../../constants/user";
	import { FacultiesUMS, FacultiesUNS, GENDER } from "../../../constants/user";
	import { UNIVS } from "../../../constants/universities";
	import { onMount } from "svelte";
	import { userId } from "../../../stores/store";
    
    export let isShowModal: boolean;
    export let userData: User;
    let isShowSuccessUpdateModal: boolean = false;

    // update data on database
    const submit = async () => {
        const response = await fetch("/users/update", {
            method: "POST",
            body: JSON.stringify(userData)
        })

        // give success notification
        isShowSuccessUpdateModal = true;
    }
</script>

<Modal bind:showModal={isShowModal}>
    <div id="main" class="w-full h-fit flex flex-col items-center bg-white rounded-tl-3xl rounded-tr-3xl">
        <h3 class="mb-2">Profil Kamu</h3>
        <form id="edit-form" class="w-full flex flex-col gap-4">
            <div id="edit-gender" class="form-group flex w-full h-full">
                <label for="gender-type">Edit gender:</label>
                <select name="gender-type" id="gender-type" bind:value={userData.gender}>
                    <option value={GENDER.MALE}>♂️ Laki-laki</option>
                    <option value={GENDER.FEMALE}>♀️ Perempuan</option>
                </select>
            </div>
            <div id="edit-age" class="form-group flex w-full h-full">
                <label for="age-type">Edit umur</label>
                <input id="age-type" name="age-type" type="number" bind:value={userData.age}>
            </div>
            <div id="edit-faculty" class="form-group flex w-full h-full">
                <label for="faculty-type">Edit fakultas:</label>
                <select name="faculty-type" id="faculty-type" bind:value={userData.faculty}>
                    {#if (userData.univ === UNIVS.UNS)}
                        {#each Object.values(FacultiesUNS) as faculty}
                            <option value={faculty}>{faculty}</option>
                        {/each}
                    {:else if (userData.univ === UNIVS.UMS)}
                        {#each Object.values(FacultiesUMS) as faculty}
                            <option value={faculty}>{faculty}</option>
                        {/each}
                    {/if}
                </select>
            </div>
        </form>

        <div in:slide out:slide id="btn-order" class="w-full mt-8 h-fit flex justify-center z-50">
            <Button text="UPDATE" size="lg" bgColor="bg-black" textColor="text-white" on:click={submit} isSqure isFullWidth />
        </div>
    </div>
</Modal>
<Modal bind:showModal={isShowSuccessUpdateModal} >
    <h3 class="text-center">OKee sip, profil kamu terlah ter-update 🤩</h3>
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