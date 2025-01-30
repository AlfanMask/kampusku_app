<script lang="ts">
    export let icon: string; // fontawesome
    export let bgColor: string = "bg-gray-400"; // tailwind-color
    export let description: string|null = null; // if necessary
    export let description2: string|null = null; // if necessary
</script>

<div class="flex flex-col gap-1 items-center min-w-24">
    <div class="flex justify-center items-center {bgColor} w-10 h-10 rounded-full shadow-lg cursor-pointer">
        <i class="{icon} text-white"/>
    </div>
    <div class="flex flex-col items-center">
        {#if description}<span class="!font-medium">{description}</span>{/if}
        {#if description2}<span class="!font-medium !text-xs !text-secondary">{description2}</span>{/if}
    </div>
</div>