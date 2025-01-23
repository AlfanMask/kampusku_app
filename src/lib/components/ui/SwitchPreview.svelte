<script lang="ts">
	import { isGrid, userId } from "../../../stores/store";

    export let firstItem: string; // fontawesome
    export let secondItem: string; // fontawesome

    const handleSwitchGrid = (isGrid: boolean) => {
        $isGrid = isGrid;
        updateData(isGrid)
    }

    const updateData = async (isGrid: boolean) => {
        await fetch("/api/users/update/is_grid_preference_by_user_id", {
            method: "POST",
            body: JSON.stringify({
                isGrid,
                userId: $userId,
            })
        })
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div id="switch">
    <ul class="text-sm font-medium text-center rounded-lg shadow flex">
        <li class="w-full focus-within:z-10" on:click={() => { handleSwitchGrid(false) }}>
            <i id="first" class="{firstItem} inline-block w-8 p-2 border-r rounded-s-lg {!$isGrid ? 'active' : ''}"></i>
        </li>
        <li class="w-full focus-within:z-10" on:click={() => { handleSwitchGrid(true) }}>
            <i id="second" class="{secondItem} inline-block w-8 p-2 border-s-0 rounded-e-lg {$isGrid ? 'active' : ''}"></i>
        </li>
    </ul>
</div>

<style lang="postcss">
    i {
        @apply text-gray-300;
    }
    .active {
        @apply text-secondary;
    }
</style>