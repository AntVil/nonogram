<script>
    import { createEventDispatcher } from "svelte";

    import { clickOutside } from "./clickOutside";

    const dispatch = createEventDispatcher();

    let container;
    let height = 0;

    function toggleCollapse() {
        if (height === 0) {
            height = container.scrollHeight;
        } else {
            height = 0;
        }
    }

    function close() {
        height = 0;
    }
</script>

<span use:clickOutside={clickOutside} on:clickOutside={close}>
    <button on:click={toggleCollapse}>new</button>
    <div bind:this={container} style="max-height: {height}px">
        <button on:click={() => dispatch("newGame", { size: 5 })}>5x5</button>
        <button on:click={() => dispatch("newGame", { size: 10 })}>10x10</button
        >
        <button on:click={() => dispatch("newGame", { size: 15 })}>15x15</button
        >
    </div>
</span>

<style>
    span {
        display: grid;
    }

    button {
        padding: var(--gap-size);
        border: none;
        background-color: var(--theme-color-1);
    }

    div {
        display: grid;
        transition: max-height 0.5s;
        overflow: hidden;
    }

    div > button {
        background-color: var(--theme-color-2);
    }

    @media (hover: hover) {
        button:hover {
            cursor: pointer;
            background-color: var(--theme-color-3);
        }
    }
</style>
