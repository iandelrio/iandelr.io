
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

            // allow keypress to occur (call nothing)
        }
    });
}

function sudokuHelper() {
    removeFeedback();
    const sudokuGrid = document.getElementById("sudoku-grid");
    let originalNumsArr, allNumsArr, solutionArr, errorsArr = [];
    originalNumsArr = getArrayFromSudoku(sudokuGrid, true);
    allNumsArr = getArrayFromSudoku(sudokuGrid, false);
    solutionArr = solveSudoku(originalNumsArr);

    if (originalNumsArr = false) {
        displayFeedback("Puzzle cannot be solved", true);
    }

    // check if any user errors
    let diffFlag = false;
    [errorsArr, diffFlag] = diffSudokuArrays(allNumsArr, solutionArr);

    // testing beginning (to remove) =========
    // diffFlag = true;
    // errorsArr = [...Array(81).keys()].fill(true);
    // testing end ===========================

    if (!diffFlag) {
        displayFeedback("No errors found - you're on the right track!", true);
        return;
    }

    // go through errors list, change class of corresponding input
    let cells = sudokuGrid.getElementsByTagName('input');
    errorsArr.forEach((userError, i) => {
        if (userError) {
            cells[i].classList.remove("user-input");
            cells[i].classList.add("user-error");
        }
    });

    displayFeedback("Errors have been marked!", true);
}

function sudokuSolution() {
    removeFeedback();
    const sudokuGrid = document.getElementById("sudoku-grid");
    let originalNumsArr = [];
    originalNumsArr = getArrayFromSudoku(sudokuGrid, true);
    originalNumsArr = solveSudoku(originalNumsArr);

    if (originalNumsArr === false) {
        displayFeedback("Puzzle cannot be solved", false);
        return;
    }

    // testing beginning (to remove) =========
    // originalNumsArr = [...Array(81).keys()];
    // originalNumsArr = false;
    // testing end ===========================

    // overwrite puzzle with solution
    let cells = sudokuGrid.getElementsByTagName('input');
    originalNumsArr.forEach((num, i) => {
        cells[i].classList.remove("user-input");
        cells[i].classList.remove("user-error");
        if (num > 0) {
            cells[i].value = num;
        }
    });
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

function diffSudokuArrays(allNumsArr, solutionArr) {
    let diffArr = [];
    let diffFlag = false;
    allNumsArr.forEach((num, i) => {
        if (num === 0) {
            diffArr.push(false);
        } else {
            diffArr.push(num !== solutionArr[i]);
            diffFlag = diffFlag || num !== solutionArr[i]
        }

    });
    return [diffArr, diffFlag];
}
