const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        if (board[index] !== "" || gameOver) return;

        board[index] = currentPlayer;
        cell.innerText = currentPlayer;

        if (checkWin()) {
            statusText.innerText = `Player ${currentPlayer} Wins!`;
            gameOver = true;
            return;
        }

        if (!board.includes("")) {
            statusText.innerText = "It's a Draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.innerText = `Player ${currentPlayer} Turn`;
    });
});

function checkWin() {
    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
    );
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    statusText.innerText = "Player X Turn";
    cells.forEach(cell => cell.innerText = "");
}
