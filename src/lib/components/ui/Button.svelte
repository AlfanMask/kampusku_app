<script lang="ts">
    export let text: String = "TEXT";
    export let bgColor: string = "bg-base"; // tailwind: 'bg-base'
    export let textColor: string = "text-secondary"; // tailwind: 'text-secondary'
    export let size: "sm" | "md" | "lg" = "md";
    export let isFullWidth: boolean = false;
    export let isPrimary: boolean = true;
    export let isSqure: boolean = false;
</script>

{#if (isPrimary)}
<button on:click class="{isFullWidth ? 'w-full' : 'w-fit'} { size === 'sm' ? 'px-6 py-1' : size === 'md' ? 'px-8 py-3' : 'px-10 py-4' } {isSqure ? 'rounded-lg' : 'rounded-full'}  {textColor} {bgColor} font-semibold ">
    {text}
</button>
{:else}
<button on:click class="{isFullWidth ? 'w-full' : 'w-fit'} { size === 'sm' ? 'px-6 py-1' : size === 'md' ? 'px-8 py-3' : 'px-10 py-4' } {isSqure ? 'rounded-lg' : 'rounded-full'} {textColor} {bgColor} font-semibold border-2 border-solid border-secondary ">
    {text}
</button>
{/if}


<style>
    button {
        transition: all 0.3s ease-in-out;
    }
    button:hover {
        transform: scale(1.05);
        transition: all 0.3s ease-in-out;
    }
</style>