import { writable, derived } from "svelte/store";
import { decompressGrid, compressGrid, arrayEqual, calcColumnNumbers, calcRowNumbers } from "./gameUtil";

let gameGrid = decompressGrid(localStorage.getItem("nonogramGame"), 2)

export const gameStore = writable(gameGrid);
export const movesStore = writable(decompressGrid(localStorage.getItem("nonogramMoves"), 3));

let gameColumns = calcColumnNumbers(gameGrid);
let gameRows = calcRowNumbers(gameGrid);

movesStore.subscribe(grid => {
    localStorage.setItem("nonogramMoves", compressGrid(grid, 3));
});

export const generateNew = size => {
    let grid = [];
    for (let y = 0; y < size; y++) {
        let row = [];
        for (let x = 0; x < size; x++) {
            row.push(Math.random() < 0.5 ? 0 : 1);
        }
        grid.push(row);
    }
    gameColumns = calcColumnNumbers(grid);
    gameRows = calcRowNumbers(grid);
    gameStore.set(grid);

    movesStore.set(grid.map(row => row.map(_ => 0)));

    localStorage.setItem("nonogramGame", compressGrid(grid, 2));
}

export const gameColumnsStore = derived(movesStore, $movesStore => () => {
    let movesColumns = calcColumnNumbers($movesStore);

    let result = [];
    for (let i = 0; i < gameColumns.length; i++) {
        result.push(
            {
                "values": gameColumns[i],
                "complete": arrayEqual(gameColumns[i], movesColumns[i])
            }
        )
    }

    return result;
});

export const gameRowsStore = derived(movesStore, $movesStore => () => {
    let movesRows = calcRowNumbers($movesStore);

    let result = [];
    for (let i = 0; i < gameRows.length; i++) {
        result.push(
            {
                "values": gameRows[i],
                "complete": arrayEqual(gameRows[i], movesRows[i])
            }
        )
    }

    return result;
});
