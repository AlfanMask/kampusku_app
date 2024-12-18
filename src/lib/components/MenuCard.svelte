<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "./ui/Button.svelte";

    export let title: string;
    export let desc: string;
    export let btnText: string;
    export let bgImagePath: string; // ex: /img/background.png
    export let bgGradientCode: string|null; // css variable, ex: --blueish-gradient,
</script>

<div class="menu-card p-4 pt-20 rounded-2xl !bg-cover !bg-center !bg-no-repeat" style="background: var({bgGradientCode}), url('{bgImagePath}')">
    <h3 class="!text-white">{title}</h3>
    <p class="!text-white opacity-75 mb-6 font-light">{desc}</p>
    <Button text="{btnText}" bgColor="bg-base" textColor="text-primary" on:click isFullWidth />
</div>