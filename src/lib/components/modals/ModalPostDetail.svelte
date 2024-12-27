<script lang='ts'>
	import { DataType } from "../../../constants/data_types";
	import type { FDGetLink } from "../../../constants/form_data";
	import type { FessFriends, Mager } from "../../../constants/tables";
	import { truncateText, removeHTMLElements } from "../../../helper/text";
	import Button from "../ui/Button.svelte";
	import Modal from "../ui/Modal.svelte";
    
    export let isShowModal: boolean;
    export let data: FessFriends | Mager;

    // date posted
    const date = new Date(data.created_at);
    const formattedDate = date.toLocaleString("en-US", {
        timeZone: "Asia/Bangkok",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    const submit = () => {
        // send back data to telegram bot to get post link on bot
        const sumbmittedData: FDGetLink = {
            type: DataType.GET_LINK,
            link: data.link,
        }
        window.Telegram.WebApp.sendData(JSON.stringify({ data: sumbmittedData }));
    }
</script>

<Modal bind:showModal={isShowModal}>
    <div id="main" class="w-full h-fit pt-4 flex flex-col items-center bg-white rounded-tl-3xl rounded-tr-3xl">
        <div class="w-full flex flex-col gap-2">
            <p class="w-full whitespace-pre-line border border-solid border-secondary rounded-lg p-4">{removeHTMLElements(truncateText(data.new_msg || data.message, 250))}</p>
            <div class="flex justify-between items-center">
                <div class="w-full flex flex-col">
                    <span class="!text-secondary opacity-50 !text-xs ml-1">{formattedDate}</span>
                    <span class="!text-secondary opacity-50 !text-xs ml-1">{data.new_msg ? 'Edited' : ''}</span>
                </div>
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