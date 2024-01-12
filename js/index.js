
document.addEventListener("DOMContentLoaded", function () {
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

    
});
