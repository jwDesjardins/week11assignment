// Game variables
let currentPlayer = 'X';
let gameEnded = false;

// Cell elements
const cells = Array.from(document.querySelectorAll('.cell'));

// Turn display
const turnDisplay = document.getElementById('turn');

// Restart button
const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', restartGame);

// Result alert
const resultAlert = document.getElementById('result');

// Add click event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', cellClick);
});

// Cell click event handler
function cellClick(event) {
  const cell = event.target;
  if (gameEnded || cell.textContent !== '') {
    return;
  }

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === 'X' ? 'text-danger' : 'text-success');

  if (checkWin()) {
    endGame(`${currentPlayer} wins!`);
  } else if (checkDraw()) {
    endGame("It's a draw!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.textContent = `${currentPlayer}'s Turn`;
  }
}

// Check for a win
function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      return true;
    }
  }

  return false;
}

// Check for a draw
function checkDraw() {
  for (const cell of cells) {
    if (cell.textContent === '') {
      return false;
    }
  }
  return true;
}

// End the game
function endGame(message) {
  gameEnded = true;
  resultAlert.textContent = message;
  resultAlert.classList.add('alert-success');
  resultAlert.style.display = 'block';
}

// Restart the game
function restartGame() {
  currentPlayer = 'X';
  gameEnded = false;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('text-danger', 'text-success');
  });
  resultAlert.style.display = 'none';
  turnDisplay.textContent = "X's Turn";
}
