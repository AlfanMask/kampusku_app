<script lang='ts'>
	import Modal from "../ui/Modal.svelte";
    
    export let isShowModalNotPremium: boolean;
</script>

<Modal bind:showModal={isShowModalNotPremium}>
    <h3 class="text-center">Maaf, fitur ini hanya untuk User Premium 🚫. Silakan hubungi admin (@kampusku_admin) untuk mendapatkan akses Premium ^^</h3>
</Modal>