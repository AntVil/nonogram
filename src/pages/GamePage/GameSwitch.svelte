<script>
    export let filling = true;
</script>

<div>
    <button class={filling ? "selected" : ""} on:click={() => {filling = true}}></button>
    <button class={filling ? "" : "selected"} on:click={() => {filling = false}}></button>
</div>

<style>
    div{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
        padding: 5px;
        margin: 5px;
        background-color: var(--theme-color-1);
        border-radius: 5px;
    }

    button{
        width: calc(1.5 * min(4.5vw, 3.5vh));
        height: calc(1.5 * min(4.5vw, 3.5vh));
        background-color: transparent;
        border: none;
        border-radius: 5px;
    }

    button::after{
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background-color: var(--theme-color-3);
    }

    button:first-child::after{
        mask-image: url("../images/icons/block.svg");
        -webkit-mask-image: url("../images/icons/block.svg");
    }

    button:last-child::after{
        mask-image: url("../images/icons/cross.svg");
        -webkit-mask-image: url("../images/icons/cross.svg");
    }

    .selected{
        background-color: var(--theme-color-2);
    }
</style>
