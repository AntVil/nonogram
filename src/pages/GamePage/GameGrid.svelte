<script>
    import { movesStore } from "../../store/gameStore";

    export let filling;

    let container;

    let mouseIsDown = false;
    let currentlyFilling = undefined;

    function getIndices(e) {
        e = e.touches?.[0] || e;
        let size = $movesStore.length;
        let rect = container.getBoundingClientRect();

        let x = Math.floor((size * (e.pageX - rect.left)) / rect.width);
        let y = Math.floor((size * (e.pageY - rect.top)) / rect.height);

        if (x < 0 || x > size - 1) {
            x = -1;
        }
        if (y < 0 || y > size - 1) {
            y = -1;
        }

        return [x, y];
    }

    function updateGrid(x, y) {
        if (x === -1 || y === -1) {
            return;
        }

        let value = filling ? 1 : 2;

        if (currentlyFilling === undefined) {
            if ($movesStore[y][x] === 0) {
                $movesStore[y][x] = value;
                currentlyFilling = true;
            } else if(value === $movesStore[y][x]) {
                $movesStore[y][x] = 0;
                currentlyFilling = false;
            }
        } else if (currentlyFilling) {
            if($movesStore[y][x] === 0){
                $movesStore[y][x] = value;
            }
        } else {
            if($movesStore[y][x] === value){
                $movesStore[y][x] = 0;
            }
        }
    }

    function mousedown(e) {
        mouseIsDown = true;

        let [x, y] = getIndices(e);
        updateGrid(x, y);
    }

    function mousemove(e) {
        if (!mouseIsDown) {
            return;
        }

        let [x, y] = getIndices(e);
        updateGrid(x, y);
    }

    function mouseup() {
        mouseIsDown = false;
        currentlyFilling = undefined;
    }
</script>

<section
    bind:this={container}
    on:mousedown|preventDefault={mousedown}
    on:touchstart|preventDefault={mousedown}
    on:mousemove|preventDefault={mousemove}
    on:touchmove|preventDefault={mousemove}
    on:mouseup|preventDefault={mouseup}
    on:touchend|preventDefault={mouseup}
    on:mouseleave|preventDefault={mouseup}
    on:touchcancel|preventDefault={mouseup}
>
    {#each $movesStore as row}
        <div>
            {#each row as col}
                <span class={col === 1 ? "filled" : col === 2 ? "cross" : ""} />
            {/each}
        </div>
    {/each}
</section>

<style>
    section {
        display: grid;
        grid-auto-rows: 1fr;
        background-color: var(--theme-color-1);
        gap: 1px;
    }

    div {
        display: grid;
        grid-auto-flow: column;
    }

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: min(4.5vw, 3.5vh);
        height: min(4.5vw, 3.5vh);
        overflow: hidden;
        user-select: none;
    }

    div {
        gap: 1px;
    }

    div {
        border-top: 1px solid var(--theme-color-0);
        border-bottom: 1px solid var(--theme-color-0);
    }

    span {
        border-left: 1px solid var(--theme-color-0);
        border-right: 1px solid var(--theme-color-0);
    }

    div:nth-child(5n) {
        border-bottom: 1px solid var(--theme-color-2);
    }

    div:nth-child(5n+1) {
        border-top: 1px solid var(--theme-color-2);
    }

    span:nth-child(5n) {
        border-right: 1px solid var(--theme-color-2);
    }

    span:nth-child(5n+1) {
        border-left: 1px solid var(--theme-color-2);
    }

    div:last-child{
        border-bottom: 1px solid var(--theme-color-0);
    }

    span:last-child{
        border-right: 1px solid var(--theme-color-0);
    }

    .filled {
        background-color: var(--theme-color-3);
    }

    .cross {
        background-color: var(--theme-color-3);
        mask-image: url("../images/icons/cross.svg");
        -webkit-mask-image: url("../images/icons/cross.svg");
    }
</style>
