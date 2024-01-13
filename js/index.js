
document.addEventListener("DOMContentLoaded", function () {
    arrowKeyNav();
    cellInput();
});

function arrowKeyNav() {
    const sudokuGrid = document.getElementById("sudoku-grid");

    sudokuGrid.addEventListener("keydown", (event) => {

        let currentInput = sudokuGrid.querySelector("input");
        if (document.activeElement.classList.contains("sudoku-cell")) {
            currentInput = document.activeElement
        }
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
            currentInput.focus();
        }

        function moveUp() {
            const currentRowIndex = currentInput.parentNode.parentNode.rowIndex;
            if (currentRowIndex > 0) {
                currentInput = sudokuGrid.rows[currentRowIndex - 1].cells[currentInput.parentNode.cellIndex].querySelector("input");
                return true;
            }
            return false;
        }

        function moveDown() {
            const currentRowIndex = currentInput.parentNode.parentNode.rowIndex;
            if (currentRowIndex < sudokuGrid.rows.length - 1) {
                currentInput = sudokuGrid.rows[currentRowIndex + 1].cells[currentInput.parentNode.cellIndex].querySelector("input");
                return true;
            }
            return false;
        }

        function moveLeft() {
            const currentCellIndex = currentInput.parentNode.cellIndex;
            if (currentCellIndex > 0) {
                currentInput = currentInput.parentNode.parentNode.cells[currentCellIndex - 1].querySelector("input");
                return true;
            }
            return false;
        }

        function moveRight() {
            const currentCellIndex = currentInput.parentNode.cellIndex;
            if (currentCellIndex < currentInput.parentNode.parentNode.cells.length - 1) {
                currentInput = currentInput.parentNode.parentNode.cells[currentCellIndex + 1].querySelector("input");
                return true;
            }
            return false;
        }

    });
}

function cellInput() {
    const sudokuGrid = document.getElementById("sudoku-grid");
    sudokuGrid.addEventListener("keydown", (event) => {
        const key = event.key;

        // check if input is not a number
        if (key === "Backspace") {
            // allow keypress to occur

        } else if (isNaN(key)) {
            event.preventDefault();

        } else {
            // get current cell / input
            let currentInput = sudokuGrid.querySelector("input");
            if (document.activeElement.classList.contains("sudoku-cell")) {
                currentInput = document.activeElement
            }

            // check cell input mode
            let inputMode = document.querySelector('input[name="cell-input-mode"]:checked').value
            if (inputMode === "original") {
                // remove user-input class
                currentInput.classList.remove("user-input")

            } else if (inputMode === "user") {
                // add user-input class
                currentInput.classList.add("user-input")
            }

            // replace value in cell
            currentInput.value = ""
            // allow keypress to occur
        }

    });
}

// outer function
function sudokuSolver() {
    const sudokuGrid = document.getElementById("sudoku-grid")
    let originalArr, completeArr = []
    originalArr = getArrayFromSudoku(sudokuGrid, true)
    completeArr = getArrayFromSudoku(sudokuGrid, false)
    originalArr = solveSudoku(originalArr)
    outputArrayToSudokuGrid(originalArr)
    return true
}
/**
 * Function to convert table element representing sudoku board to array
 * @param {table} tableElem Table element representing sudoku board
 * @param {boolean} inputType True to pull original numbers only, otherwise pull all numbers
 * @return {array[num]} A 1D array holding numbers in sudoku board
 */
function getArrayFromSudoku(tableElem, inputType) {
    let arr = []
    let cells = tableElem.getElementsByTagName('input')
    let cellVal = 0
    Array.from(cells).forEach(cell => {
        if (cell.value === '') {
            cellVal = 0
        } else if (inputType && cell.classList.contains("user-input")) {
            cellVal = 0
        } else {
            cellVal = Number(cell.value)
        }
        arr.push(cellVal)
    });
    return arr
}

function outputArrayToSudokuGrid(arr) {
    // output array as sudoku
    return
}

// actually solve sudoku
function solveSudoku(arr) {

    return arr
}