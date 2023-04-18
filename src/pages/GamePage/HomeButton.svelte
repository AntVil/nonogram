<script>
    import { HOME_PAGE, pageStore } from "../../store/pageStore";
</script>

<button on:click={() => pageStore.set(HOME_PAGE)} />

<style>
    button {
        position: absolute;
        left: calc(2 * min(4.5vw, 3.5vh));
        top: calc(2 * min(4.5vw, 3.5vh));
        width: calc(2 * min(4.5vw, 3.5vh));
        height: calc(2 * min(4.5vw, 3.5vh));
        mask-image: url("../images/icons/back.svg");
        -webkit-mask-image: url("../images/icons/back.svg");
        background-color: var(--theme-color-2);
        border: none;
    }

    @media (hover: hover) {
        button:hover {
            background-color: var(--theme-color-3);
            cursor: pointer;
        }
    }
</style>
