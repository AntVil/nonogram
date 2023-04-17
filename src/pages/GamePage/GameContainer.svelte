<script>
    import GameColumns from "./GameColumns.svelte";
    import GameGrid from "./GameGrid.svelte";
    import GameRows from "./GameRows.svelte";

    export let filling;
</script>

<section>
    <span />

    <GameRows />

    <span />

    <GameColumns />

    <GameGrid {filling} />
</section>

<style>
    section {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        grid-template-rows: auto 1fr;
    }
</style>
