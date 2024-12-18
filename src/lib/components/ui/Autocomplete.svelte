<script lang="ts">
    export let inputText: string;
    export let baseData: Array<string>;
    export let placeholder: string = "";
    export let isSqure: boolean = false;

    let autocompleteDataShown: Array<string> = [];

    $: if (inputText) {
        autocompleteDataShown = baseData.filter(item => {
            if (item.toLowerCase() !== inputText.toLowerCase() && item.toLowerCase().includes(inputText.toLocaleLowerCase())) {
                return item;
            }
        })
    } else {
        autocompleteDataShown = [];
    }

    const autoCompleteHandler = (index: number) => {
        inputText = autocompleteDataShown[index];
    }

</script>

<div class="relative w-full">
    <input
        type="text"
        placeholder="{placeholder}"
        bind:value={ inputText }
        class="{isSqure ? 'rounded-lg' : 'rounded-3xl'} w-full h-12 p-4 border border-solid border-secondary shadow-lg"
    />
    {#if (autocompleteDataShown.length > 0)}
    <div class="flex flex-col gap-2 p-4 mt-2 absolute bg-white rounded-xl w-full z-10 shadow-lg">
        {#each autocompleteDataShown as item, i}
            <button class="w-full p-x2 cursor-pointer text-start text-black" on:click={ () => autoCompleteHandler(i) }>{item}</button>
        {/each}
    </div>
    {/if}
</div>