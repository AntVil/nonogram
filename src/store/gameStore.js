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

function calcColumnNumbers(grid) {
    let columns = [];
    for (let x = 0; x < grid.length; x++) {
        let column = [];
        let item = 0;
        for (let y = 0; y < grid.length; y++) {
            if (grid[y][x] === 1) {
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

    return columns;
}

function calcRowNumbers(grid) {
    let rows = [];
    for (let y = 0; y < grid.length; y++) {
        let gameRow = [];
        let item = 0;
        for (let x = 0; x < grid.length; x++) {
            if (grid[y][x] === 1) {
                item++;
            } else if (item !== 0) {
                gameRow.push(item);
                item = 0;
            }
        }

        if (item !== 0) {
            gameRow.push(item);
        }

        if (gameRow.length === 0) {
            gameRow.push(0);
        }

        rows.push(gameRow);
    }

    return rows;
}

function arrayEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
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
