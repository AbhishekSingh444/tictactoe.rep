// script.js

// Function to hide modal and start game
function startGame() {
    document.getElementById("startModal").style.display = "none";
    restartGame(); // Reset game state each time the game starts
}

// Event listener for Start Button
document.getElementById("startButton").addEventListener("click", startGame);

// Game variables
const board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;
const messageElement = document.getElementById("message");
const popup = document.getElementById("winPopup"); // Popup element
const popupMessage = document.getElementById("popupMessage"); // Popup message
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Handle cell click
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
        showWinPopup(currentPlayer); // Show popup for winner
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

// Check for win
function checkWin() {
    return winningCombos.some(combo => {
        return combo.every(index => board[index] === currentPlayer);
    });
}

// Show Win Popup
function showWinPopup(winner) {
    popupMessage.textContent = `Player ${winner} Wins!`; // Set winner message
    popup.classList.add("active"); // Show popup
    document.body.classList.add("fireworks"); // Start fireworks background
}

// Restart game from popup
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

    // Hide popup and remove fireworks
    popup.classList.remove("active");
    document.body.classList.remove("fireworks");
}

// Add event listeners to each cell
document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Event listener for restart button in popup
document.getElementById("restartButton").addEventListener("click", restartGame);
