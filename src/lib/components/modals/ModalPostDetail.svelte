<script lang='ts'>
	import type { FessFriends, Mager } from "../../../constants/tables";
	import { truncateText, removeHTMLElements } from "../../../helper/text";
	import Button from "../ui/Button.svelte";
	import Modal from "../ui/Modal.svelte";
    
    export let isShowModal: boolean;
    export let data: FessFriends | Mager;

    const submit = () => {
        // TODO: send back data to telegram bot to get post link on bot
        console.log("// TODO: send back data to telegram bot to get post link on bot");
    }
</script>

<Modal bind:showModal={isShowModal}>
    <div id="main" class="w-full h-fit pt-4 flex flex-col items-center bg-white rounded-tl-3xl rounded-tr-3xl">
        <div class="w-full flex flex-col items-end gap-2">
            <p class="w-full whitespace-pre-line border border-solid border-secondary rounded-lg p-4">{removeHTMLElements(truncateText(data.message, 250))}</p>
            <div id="stats" class="flex gap-4 px-2">
                <div id="comments" class="flex items-center gap-1">
                    <i class="fa-regular fa-comment"></i>
                    <span>{!data.num_comments ? "0" : data.num_comments}</span>
                </div>
                <div id="reactions" class="flex items-center gap-1">
                    <i class="fa-solid fa-icons"></i>
                    <span>{data.num_reactions}</span>
                </div>
            </div>
        </div>
        <div class="w-full mt-8 px-10 h-fit flex justify-center">
            <Button text="CEK POSTINGAN 🚀" size="md" bgColor="bg-black" textColor="text-white" on:click={submit} isFullWidth />
        </div>
    </div>
</Modal>

<style lang="postcss">
    i {
        @apply text-sm text-gray-500;
    }
    span {
        @apply text-lg;
    }
</style>