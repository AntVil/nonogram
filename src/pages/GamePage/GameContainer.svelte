<script>
    import GameColumns from "./GameColumns.svelte";
    import GameGrid from "./GameGrid.svelte";
    import GameRows from "./GameRows.svelte";
</script>

<section>
    <span />

    <GameRows />

    <GameColumns />

    <GameGrid />
</section>

<style>
    section {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr;
        /*width: 500px;
        max-width: 80%;*/
    }
</style>
