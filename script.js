const startButton = document.getElementById('start-game');
const restartButton = document.getElementById('restart-game');
const introScreen = document.querySelector('.intro-screen');
const gameScreen = document.querySelector('.game-screen');
const turnIndicator = document.getElementById('turn-indicator');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const cells = document.querySelectorAll('[data-cell]');

let player1Name = 'Player 1';
let player2Name = 'Player 2';
let currentPlayer;
let gameActive;
let gameState;
let isAgainstAI = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    player1Name = player1Input.value || 'Player 1';
    player2Name = player2Input.value || 'Player 2';
    isAgainstAI = !player2Input.value;
    currentPlayer = player1Name;
    gameActive = true;
    gameState = Array(9).fill('');
    turnIndicator.textContent = `${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
        cell.addEventListener('click', handleCellClick);
    });
    introScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer === player1Name ? 'X' : 'O';
    cell.textContent = gameState[cellIndex];
    checkResult();

    if (gameActive && isAgainstAI && currentPlayer === player2Name) {
        aiMove();
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            break;
        }
    }

    if (roundWon) {
        turnIndicator.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        turnIndicator.textContent = `Draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
    turnIndicator.textContent = `${currentPlayer}'s Turn`;
}

function restartGame() {
    gameScreen.classList.add('hidden');
    introScreen.classList.remove('hidden');
}

function aiMove() {
    let availableCells = [];
    gameState.forEach((cell, index) => {
        if (!cell) availableCells.push(index);
    });

    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomCell] = 'O';
    cells[randomCell].textContent = 'O';
    checkResult();
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
