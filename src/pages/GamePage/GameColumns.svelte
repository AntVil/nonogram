<script>
    import { gameRowsStore } from "../../store/gameStore";
</script>

<section>
    {#each $gameRowsStore() as row}
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
        align-items: center;
    }

    div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
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
