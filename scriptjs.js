// Define HTML content
const htmlContent = `
<style>
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: 'Arial', sans-serif;
        background: linear-gradient(135deg, #89fffd, #ef32d9);
    }

    .game-container {
        text-align: center;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    h1 {
        font-size: 2rem;
        color: #333;
        margin-bottom: 10px;
        font-weight: bold;
    }

    .board {
        display: grid;
        grid-template-columns: repeat(3, 100px);
        grid-template-rows: repeat(3, 100px);
        gap: 10px;
        margin: 20px auto;
    }

    .cell {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        font-weight: bold;
        cursor: pointer;
        border-radius: 15px;
        color: #333;
        transition: transform 0.3s ease, background-color 0.3s ease;
        background-color: #ffe6f7;
    }

    .cell:hover {
        background-color: #ffe0e6;
        transform: scale(1.1);
    }

    .cell.X {
        color: #ef476f;
        text-shadow: 0 4px 8px rgba(239, 71, 111, 0.4);
    }

    .cell.O {
        color: #06d6a0;
        text-shadow: 0 4px 8px rgba(6, 214, 160, 0.4);
    }

    button {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 1rem;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        color: white;
        background: linear-gradient(45deg, #06d6a0, #ef476f);
        cursor: pointer;
        transition: background 0.3s ease;
    }

    button:hover {
        background: linear-gradient(45deg, #ef476f, #06d6a0);
    }

    #message {
        margin-top: 15px;
        font-size: 1.2rem;
        color: #333;
        font-weight: bold;
        animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
</style>

<div class="game-container">
    <h1>Tic Tac Toe</h1>
    <div id="gameBoard" class="board">
        ${Array.from({ length: 9 }, (_, i) => `<div class="cell" data-index="${i}"></div>`).join('')}
    </div>
    <button id="restartButton">Restart Game</button>
    <p id="message"></p>
</div>
`;

// Inject HTML into the notebook
document.body.innerHTML = htmlContent;

// JavaScript logic for Tic Tac Toe
const board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;
const messageElement = document.getElementById("message");
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Function to handle cell click
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute("data-index");

    // Ignore if cell is already filled or game is over
    if (board[cellIndex] || !gameActive) return;

    // Update board state and UI
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    // Check for win or draw
    if (checkWin()) {
        messageElement.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    } else if (board.every(cell => cell)) {
        messageElement.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    // Switch player and update message
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check for win
function checkWin() {
    return winningCombos.some(combo => {
        return combo.every(index => board[index] === currentPlayer);
    });
}

// Function to restart the game
function restartGame() {
    board.fill(null);
    gameActive = true;
    currentPlayer = "X";
    messageElement.textContent = `Player ${currentPlayer}'s turn`;

    // Clear cell content and remove classes
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
}

// Add event listeners to each cell
document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Event listener for the restart button
document.getElementById("restartButton").addEventListener("click", restartGame);

// Initialize the game state
messageElement.textContent = `Player ${currentPlayer}'s turn`;
