import { writable, derived } from "svelte/store";

function compressGrid(grid, base) {
    if (grid === null || grid === "null" || grid === undefined) {
        return null;
    }

    let compressedGrid = [];
    for (let row of grid) {
        let compressedRow = 0;
        for (let i = 0; i < row.length; i++) {
            compressedRow += row[i] * Math.pow(base, i);
        }
        compressedGrid.push(compressedRow);
    }
    return JSON.stringify(compressedGrid);
}

function decompressGrid(compressedGrid, base) {
    if (compressedGrid === null || compressedGrid === "null" || compressedGrid === undefined) {
        return null;
    }

    compressedGrid = JSON.parse(compressedGrid)

    let grid = [];
    for (let compressedRow of compressedGrid) {
        let row = []
        for (let i = 0; i < compressedGrid.length; i++) {
            row.push(compressedRow % base);
            compressedRow = Math.floor(compressedRow / base);
        }
        grid.push(row)
    }
    return grid;
}

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

export const gameColumnsStore = derived(gameStore, ($gameStore) => () => {
    let columns = [];
    for (let x = 0; x < $gameStore.length; x++) {
        let column = [];
        let item = 0;
        for (let y = 0; y < $gameStore.length; y++) {
            if ($gameStore[y][x] !== 0) {
                item++;
            } else if (item !== 0) {
                column.push(item);
                item = 0;
            }
        }

        if (item !== 0) {
            column.push(item);
        }

        if (column.length === 0) {
            column.push(0);
        }

        columns.push(column);
    }

    return columns
});

export const gameRowsStore = derived(gameStore, ($gameStore) => () => {
    let rows = [];
    for (let y = 0; y < $gameStore.length; y++) {
        let row = [];
        let item = 0;
        for (let x = 0; x < $gameStore.length; x++) {
            if ($gameStore[y][x] !== 0) {
                item++;
            } else if (item !== 0) {
                row.push(item);
                item = 0;
            }
        }

        if (item !== 0) {
            row.push(item);
        }

        if (row.length === 0) {
            row.push(0);
        }

        rows.push(row);
    }

    return rows
});
