<script>
    import { gameColumnsStore } from "../../store/gameStore";
</script>

<section>
    {#each $gameColumnsStore() as row}
        <div>
            {#each row as col}
                <span>{col}</span>
            {/each}
        </div>
    {/each}
</section>

<style>
    section {
        display: grid;
        grid-auto-flow: column;
        align-items: flex-end;
    }

    div {
        display: flex;
        flex-direction: column;
    }

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: min(4.5vw, 3.5vh);
        height: min(4.5vw, 3.5vh);
        overflow: hidden;
    }
</style>
