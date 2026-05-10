let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

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

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const winnerDisplay = document.getElementById('winner');

// Initialize game
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    // Check if cell is already filled or game is over
    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    // Update game board and cell
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.setAttribute('data-player', currentPlayer);
    cell.disabled = true;

    // Check for winner
    if (checkWinner()) {
        gameActive = false;
        winnerDisplay.textContent = `🎉 Player ${currentPlayer} wins!`;
        statusDisplay.textContent = `Game Over`;
        return;
    }

    // Check for draw
    if (gameBoard.every(cell => cell !== '')) {
        gameActive = false;
        winnerDisplay.textContent = `It's a Draw!`;
        statusDisplay.textContent = `Game Over`;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] === '' || gameBoard[b] === '' || gameBoard[c] === '') {
            continue;
        }
        if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusDisplay.textContent = `Player X's Turn`;
    winnerDisplay.textContent = '';

    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeAttribute('data-player');
        cell.disabled = false;
    });
}
