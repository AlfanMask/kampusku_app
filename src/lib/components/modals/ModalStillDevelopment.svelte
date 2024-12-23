<script lang='ts'>
	import Modal from "../ui/Modal.svelte";
    
    export let isShowModalOnDev: boolean;
</script>

<Modal bind:showModal={isShowModalOnDev}>
    <h3 class="text-center">Maaf, fitur ini masih dalam proses pengembangan. Mohon menggunakan fitur Kampusku lainnya dulu 😊🙌</h3>
</Modal>