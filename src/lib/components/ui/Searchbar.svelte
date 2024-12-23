<script lang="ts">
    export let inputText: string;
    export let placeholder: string = "";
    export let isSqure: boolean = false;
</script>

<div class="relative w-full">
    <input
        type="text"
        placeholder="{placeholder}"
        bind:value={ inputText }
        class="{isSqure ? 'rounded-lg' : 'rounded-3xl'} w-full h-12 p-4 border border-solid border-secondary shadow-lg"
    />
</div>