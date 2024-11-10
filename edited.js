// Define HTML content
const htmlContent = `
<style>
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        font-family: 'Arial', sans-serif;
        background: linear-gradient(135deg, #1a1a3c, #4a1a3c, #1a3c4a);
    }

    /* Start Screen Styles */
    .start-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #1a1a3c, #4a1a3c, #1a3c4a);
        z-index: 1000;
    }

    .start-container {
        text-align: center;
        background: rgba(255, 255, 255, 0.97);
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.2);
    }

    /* Result Popup Styles */
    .result-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1000;
    }

    .result-container {
        text-align: center;
        background: rgba(255, 255, 255, 0.97);
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        animation: popIn 0.5s ease-out;
        border: 2px solid rgba(255, 255, 255, 0.2);
    }

    .game-container {
        display: none;
        text-align: center;
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.97);
        padding: 30px;
        border-radius: 20px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        animation: float 6s ease-in-out infinite;
        max-width: 500px;
        width: 90%;
    }

    h1 {
        font-size: 3rem;
        background: linear-gradient(45deg, #FF3366, #FF9933);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }

    .board {
        display: grid;
        grid-template-columns: repeat(3, 100px);
        grid-template-rows: repeat(3, 100px);
        gap: 10px;
        width: fit-content;
        margin: 20px auto;
        padding: 20px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .cell {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        font-weight: bold;
        cursor: pointer;
        border-radius: 15px;
        background: white;
        border: 3px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }   

    .cell:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 20px rgba(255, 51, 102, 0.2);
    }

    .cell.X {
        background: linear-gradient(135deg, #FF336622, #FF336611);
        color: #FF3366;
        text-shadow: 0 2px 4px rgba(255, 51, 102, 0.3);
    }

    .cell.O {
        background: linear-gradient(135deg, #3399FF22, #3399FF11);
        color: #3399FF;
        text-shadow: 0 2px 4px rgba(51, 153, 255, 0.3);
    }

    button {
        padding: 15px 30px;
        font-size: 1.2rem;
        color: white;
        background: linear-gradient(45deg, #FF3366, #3399FF);
        border: none;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(0);
        transition: all 0.3s ease;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }

    button:hover {
        background: linear-gradient(45deg, #3399FF, #FF3366);
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    #startButton {
        font-size: 1.5rem;
        padding: 20px 40px;
        margin-top: 20px;
    }

    #message {
        font-size: 1.5rem;
        background: linear-gradient(45deg, #FF3366, #3399FF);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        padding: 10px;
        font-weight: bold;
    }

    .result-text {
        font-size: 2rem;
        margin-bottom: 20px;
        background: linear-gradient(45deg, #FF3366, #3399FF);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: bold;
    }
	    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    @keyframes win {
        0% { transform: scale(1); }
        50% { transform: scale(1.1) rotate(5deg); }
        100% { transform: scale(1); }
    }

    .winner {
        animation: win 0.5s ease-in-out;
        box-shadow: 0 0 25px rgba(255, 51, 102, 0.4);
    }

    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        background-color: #f0f;
        position: absolute;
        animation: confetti 5s ease-in-out infinite;
    }

    @keyframes confetti {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(720deg); }
    }

    @keyframes popIn {
        0% { transform: scale(0.3); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
    }

    @media (max-width: 500px) {
        .board {
            grid-template-columns: repeat(3, 80px);
            grid-template-rows: repeat(3, 80px);
            gap: 8px;
            padding: 15px;
        }

        .cell {
            width: 80px;
            height: 80px;
            font-size: 2rem;
        }

        h1 {
            font-size: 2rem;
        }

        button {
            padding: 12px 24px;
            font-size: 1rem;
        }
    }
</style>

<div class="start-screen" id="startScreen">
    <div class="start-container">
        <h1>Tic Tac Toe</h1>
        <button id="startButton">Start Game</button>
    </div>
</div>

<div class="result-popup" id="resultPopup">
    <div class="result-container">
        <h2 class="result-text" id="resultText"></h2>
        <button id="restartFromPopup">Play Again</button>
    </div>
</div>

<div class="game-container" id="gameContainer">
    <h1>Tic Tac Toe</h1>
    <div id="gameBoard" class="board">
        <div class="cell" data-index="0"></div>
        <div class="cell" data-index="1"></div>
        <div class="cell" data-index="2"></div>
        <div class="cell" data-index="3"></div>
        <div class="cell" data-index="4"></div>
        <div class="cell" data-index="5"></div>
        <div class="cell" data-index="6"></div>
        <div class="cell" data-index="7"></div>
        <div class="cell" data-index="8"></div>
    </div>
    <p id="message"></p>
</div>
`;

// Inject HTML into the notebook
document.body.innerHTML = htmlContent;

// Game logic
const board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;
const messageElement = document.getElementById("message");
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createConfetti() {
    const colors = ['#FF3366', '#3399FF', '#FF9933', '#33FF99', '#9933FF'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

function showResultPopup(message) {
    const popup = document.getElementById('resultPopup');
    const resultText = document.getElementById('resultText');
    resultText.textContent = message;
    popup.style.display = 'flex';
    createConfetti();
}

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    restartGame();
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute("data-index");

    if (board[cellIndex] || !gameActive) return;

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (checkWin()) {
        setTimeout(() => {
            showResultPopup(`Player ${currentPlayer} Wins!`);
        }, 500);
        gameActive = false;
        return;
    } else if (board.every(cell => cell)) {
        setTimeout(() => {
            showResultPopup("It's a Draw!");
        }, 500);
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    const hasWon = winningCombos.some(combo => {
        const isWinning = combo.every(index => board[index] === currentPlayer);
        if (isWinning) {
            combo.forEach(index => {
                document.querySelector(`[data-index="${index}"]`).classList.add('winner');
            });
        }
        return isWinning;
    });
    return hasWon;
}

function restartGame() {
    board.fill(null);
    gameActive = true;
    currentPlayer = "X";
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
    document.getElementById('resultPopup').style.display = 'none';

    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O", "winner");
    });
}

// Event listeners
document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartFromPopup').addEventListener('click', restartGame);

// Initialize message
messageElement.textContent = `Player ${currentPlayer}'s turn`;