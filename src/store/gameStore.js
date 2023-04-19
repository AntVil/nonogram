import { writable, derived } from "svelte/store";
import { decompressGrid, compressGrid, arrayEqual, calcColumnNumbers, calcRowNumbers } from "./gameUtil";

export const gameStore = writable(decompressGrid(localStorage.getItem("nonogramGame"), 2));
export const movesStore = writable(decompressGrid(localStorage.getItem("nonogramMoves"), 3));

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
    gameStore.set(grid);

    movesStore.set(grid.map(row => row.map(_ => 0)));

    localStorage.setItem("nonogramGame", compressGrid(grid, 2));
}

export const gameColumnsStore = derived([gameStore, movesStore], ([$gameStore, $movesStore]) => () => {
    let gameColumns = calcColumnNumbers($gameStore);
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

export const gameRowsStore = derived([gameStore, movesStore], ([$gameStore, $movesStore]) => () => {
    let gameRows = calcRowNumbers($gameStore);
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
