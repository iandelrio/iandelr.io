
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
                currentInput = document.activeElement;
            }

            // check cell input mode
            let inputMode = document.querySelector('input[name="cell-input-mode"]:checked').value;
            if (inputMode === "original") {
                // remove user-input class
                currentInput.classList.remove("user-input")

            } else if (inputMode === "user") {
                // add user-input class
                currentInput.classList.add("user-input")
            }

            // delete current value in cell
            currentInput.value = '';
            // allow keypress to occur
        }

    });
}

function sudokuHelper() {
    removeFeedback();
    const sudokuGrid = document.getElementById("sudoku-grid");
    let originalArr, completeArr = [];
    originalArr = getArrayFromSudoku(sudokuGrid, true);
    completeArr = getArrayFromSudoku(sudokuGrid, false);
    originalArr = solveSudoku(originalArr);
    if (originalArr = false) {
        // assume all errors mean sudoku is unsolvable
        displayFeedback("Puzzle cannot be solved", true);
    }
    // compare difference between two arrays, if no difference "right track", else highlight problem cells
}

function sudokuSolution() {
    removeFeedback();
    const sudokuGrid = document.getElementById("sudoku-grid");
    let originalArr, completeArr = [];
    originalArr = getArrayFromSudoku(sudokuGrid, true);
    originalArr = solveSudoku(originalArr);
    if (originalArr = false) {
        // assume all errors mean sudoku is unsolvable
        displayFeedback("Puzzle cannot be solved", false);
        return;
    }
    // iterate through inputs, remove "user-input" class, fill in cell vals with solution
}

/**
 * Function to convert table element representing sudoku board to array
 * @param {table} tableElem Table element representing sudoku board
 * @param {boolean} inputType True to pull original numbers only, otherwise pull all numbers
 * @return {Array[Number]} A 1D array holding numbers in sudoku board
 */
function getArrayFromSudoku(tableElem, inputType) {
    let arr = [];
    let cells = tableElem.getElementsByTagName('input');
    let cellVal = 0;
    Array.from(cells).forEach(cell => {
        if (cell.value === '') {
            cellVal = 0;
        } else if (inputType && cell.classList.contains("user-input")) {
            cellVal = 0;
        } else {
            cellVal = Number(cell.value);
        }
        arr.push(cellVal);
    });
    return arr;
}

/**
 * Function to display puzzle feedback message
 * @param {string} msg Message to display
 * @param {boolean} sourceButton True if called from sudokuHelper, False if from sudokuSolution
 */
function displayFeedback(msg, sourceButton) {
    if (sourceButton) {
        document.getElementById("sudokuHelperFeedback").innerHTML = msg;
    } else {
        document.getElementById("sudokuSolutionFeedback").innerHTML = msg;
    }
    
}

function removeFeedback() {
    displayFeedback('', true);
    displayFeedback('', false);
}

// actually solve sudoku
function solveSudoku(arr) {

    return arr;
}


