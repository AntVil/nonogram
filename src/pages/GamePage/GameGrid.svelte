<script>
    import { movesStore } from "../../store/gameStore";

    export let filling;

    let container;

    let previousX = undefined;
    let previousY = undefined;
    let mouseIsDown = false;
    let currentlyFilling = undefined;
    let axisMode = undefined;

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

        if(axisMode === undefined){
            if(previousX === x && previousY !== y){
                axisMode = 0;
            }else if(previousX !== x && previousY === y){
                axisMode = 1;
            }
        }else if(axisMode === 0){
            x = previousX;
        }else{
            y = previousY;
        }

        let value = filling ? 1 : 2;

        if (currentlyFilling === undefined) {
            if ($movesStore[y][x] === 0) {
                $movesStore[y][x] = value;
                currentlyFilling = true;
                previousX = x;
                previousY = y;
            } else if(value === $movesStore[y][x]) {
                $movesStore[y][x] = 0;
                currentlyFilling = false;
                previousX = x;
                previousY = y;
            }
        } else if (currentlyFilling) {
            if($movesStore[y][x] === 0){
                $movesStore[y][x] = value;
                previousX = x;
                previousY = y;
            }
        } else {
            if($movesStore[y][x] === value){
                $movesStore[y][x] = 0;
                previousX = x;
                previousY = y;
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
        previousX = undefined;
        previousY = undefined;
        axisMode = undefined;
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
        gap: 1px;
        border-top: 1px solid var(--theme-color-0);
        border-bottom: 1px solid var(--theme-color-0);
    }

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: min(4.5vw, 3.5vh);
        height: min(4.5vw, 3.5vh);
        overflow: hidden;
        user-select: none;
        border-left: 1px solid var(--theme-color-0);
        border-right: 1px solid var(--theme-color-0);
    }

    div:nth-child(5n) { border-bottom: 1px solid var(--theme-color-2); }
    div:nth-child(5n+1) { border-top: 1px solid var(--theme-color-2); }
    span:nth-child(5n) { border-right: 1px solid var(--theme-color-2); }
    span:nth-child(5n+1) { border-left: 1px solid var(--theme-color-2); }

    span::after{
        content: "";
        display: block;
        width: 100%;
        height: 100%;
    }

    .filled::after {
        background-color: var(--theme-color-3);
    }

    .cross::after {
        background-color: var(--theme-color-3);
        mask-image: url("../images/icons/cross.svg");
        -webkit-mask-image: url("../images/icons/cross.svg");
    }
</style>
