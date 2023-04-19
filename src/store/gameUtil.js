export const arrayEqual = function (arr1, arr2) {
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

export const compressGrid = function (grid, base) {
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

export const decompressGrid = function (compressedGrid, base) {
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

export const calcColumnNumbers = function (grid) {
    console.log("deriving")
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

export const calcRowNumbers = function (grid) {
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
