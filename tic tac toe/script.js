// Variables to keep track of game state
let currentPlayer = 'X';
let gameOver = false;

// Query all input fields with class 'bt'
const cells = document.querySelectorAll('.bt');

// Function to handle a player's move
function handleMove(event) {
  const cell = event.target;

  // Check if the cell is empty and the game is not over
  if (!cell.value && !gameOver) {
    cell.value = currentPlayer;
    cell.disabled = true;
    cell.style.backgroundColor = currentPlayer === 'X' ? 'lightblue' : 'lightcoral';

    // Check for a winning condition
    if (checkWin(currentPlayer)) {
      document.getElementById('result-text').textContent = `Player ${currentPlayer} wins!`;
      gameOver = true;
      document.getElementById('reset-button').disabled = false;
    } else if (isBoardFull()) {
      document.getElementById('result-text').textContent = "It's a draw!";
      gameOver = true;
      document.getElementById('reset-button').disabled = false;
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('result-text').textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

// Function to check for a winning condition
function checkWin(player) {
  // Define winning combinations
  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  // Check if any of the winning combinations match the player's moves
  return winCombinations.some(combination => {
    return combination.every(index => cells[index].value === player);
  });
}

// Function to check if the board is full (draw)
function isBoardFull() {
  return Array.from(cells).every(cell => cell.value !== '');
}

// Function to reset the game
function resetGame() {
  cells.forEach(cell => {
    cell.value = '';
    cell.disabled = false;
    cell.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
  });
  currentPlayer = 'X';
  gameOver = false;
  document.getElementById('result-text').textContent = "Player X's Turn";
  document.getElementById('reset-button').disabled = true;
}

// Add event listeners to each cell for handling moves
cells.forEach(cell => {
  cell.addEventListener('click', handleMove);
});

// Add event listener to the reset button
document.getElementById('reset-button').addEventListener('click', resetGame);

// Initial message
document.getElementById('result-text').textContent = "Player X's Turn";
