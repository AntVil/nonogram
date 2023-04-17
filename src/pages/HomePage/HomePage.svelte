<script>
    import NewGameButton from "./NewGameButton.svelte";

    import { MAIN_PAGE, SETTINGS_PAGE, pageStore } from "../../store/pageStore";
    import { gameStore, generateNew } from "../../store/gameStore";

    function newGame(size) {
        generateNew(size);
        pageStore.set(MAIN_PAGE);
    }
</script>

<section>
    <h1>nono<wbr />gram</h1>

    <button
        on:click={() => pageStore.set(MAIN_PAGE)}
        disabled={$gameStore === null}>continue</button
    >

    <NewGameButton on:newGame={(e) => newGame(e.detail.size)} />

    <button on:click={() => pageStore.set(SETTINGS_PAGE)}>settings</button>
</section>

<style>
    section {
        justify-self: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--gap-size);
        max-width: 80%;
    }

    h1 {
        font-size: 3rem;
        text-align: center;
    }

    button {
        padding: var(--gap-size);
        border: none;
        background-color: var(--theme-color-1);
    }

    button:disabled {
        opacity: 0.5;
    }

    @media (hover: hover) {
        button:not(:disabled):hover {
            cursor: pointer;
            background-color: var(--theme-color-3);
        }
    }
</style>
