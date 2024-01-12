
const sudokuGrid = document.getElementById("sudoku-grid");
let currentCell = sudokuGrid.querySelector("input");

sudokuGrid.addEventListener("keydown", (event) => {
    const key = event.key;
    let move = false;

    switch (key) {
        case "ArrowUp":
            move = moveUp();
            break;
        case "ArrowDown":
            move = moveDown();
            break;
        case "ArrowLeft":
            move = moveLeft();
            break;
        case "ArrowRight":
            move = moveRight();
            break;
    }

    if (move) {
        event.preventDefault();
        currentCell.focus();
    }
});

function moveUp() {
    const currentRowIndex = currentCell.parentNode.rowIndex;
    if (currentRowIndex > 0) {
        currentCell = sudokuGrid.rows[currentRowIndex - 1].cells[currentCell.cellIndex].querySelector("input");
        return true;
    }
    return false;
}

function moveDown() {
    const currentRowIndex = currentCell.parentNode.rowIndex;
    if (currentRowIndex < sudokuGrid.rows.length - 1) {
        currentCell = sudokuGrid.rows[currentRowIndex + 1].cells[currentCell.cellIndex].querySelector("input");
        return true;
    }
    return false;
}

function moveLeft() {
    const currentCellIndex = currentCell.cellIndex;
    if (currentCellIndex > 0) {
        currentCell = currentCell.parentNode.cells[currentCellIndex - 1].querySelector("input");
        return true;
    }
    return false;
}

function moveRight() {
    const currentCellIndex = currentCell.cellIndex;
    if (currentCellIndex < currentCell.parentNode.cells.length - 1) {
        currentCell = currentCell.parentNode.cells[currentCellIndex + 1].querySelector("input");
        return true;
    }
    return false;
}