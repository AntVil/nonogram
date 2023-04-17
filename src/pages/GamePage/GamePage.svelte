<script>
    import GameContainer from "./GameContainer.svelte";
    import GameSwitch from "./GameSwitch.svelte";

    let filling;
</script>

<main>
    <GameContainer {filling} />

    <GameSwitch bind:filling />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
