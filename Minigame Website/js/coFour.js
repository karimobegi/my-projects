const rows = 6;
const cols = 7;
let currentPlayer = 1;
let board = [];
let list = ["x", "#ff6961", "#77dd77"];

function createBoard() {
  const boardContainer = document.getElementById("board");

  for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", handleCellClick);
      boardContainer.appendChild(cell);
      board[row][col] = 0;
    }
  }
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const col = parseInt(clickedCell.dataset.col);
  const row = findEmptyRow(col);

  if (row !== -1) {
    board[row][col] = currentPlayer;
    updateBoard();
    if (checkWin(row, col)) {
      if (localStorage.getItem("royalRumbleStarted") === "true") {
        console.log("Riyal");
        performRoyalRumbleActions();
      }
      gameover();
    } else if (checkDraw()) {
      alert("It's a draw!");
    } else {
      currentPlayer = 3 - currentPlayer; // Switch player (1 -> 2, 2 -> 1)
    }
  }
}

function findEmptyRow(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      return row;
    }
  }
  return -1; // Column is full
}

function updateBoard() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const piece = board[row][col];

    cell.innerHTML = "";

    if (piece !== 0) {
      const pieceElement = document.createElement("div");
      pieceElement.classList.add("piece", `player-${piece}`);
      cell.appendChild(pieceElement);
    }
  });
}

function checkWin(row, col) {
  return (
    checkDirection(row, col, 0, 1) || // Horizontal
    checkDirection(row, col, 1, 0) || // Vertical
    checkDirection(row, col, 1, 1) || // Diagonal /
    checkDirection(row, col, -1, 1) // Diagonal \
  );
}

function checkDirection(row, col, rowDir, colDir) {
  const piece = board[row][col];

  for (let i = -3; i <= 3; i++) {
    const r = row + i * rowDir;
    const c = col + i * colDir;

    if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === piece) {
      if (i >= 0 && i <= 3) {
        return true;
      }
    } else {
      break;
    }
  }

  return false;
}

function checkDraw() {
  return board.every((row) => row.every((cell) => cell !== 0));
}
function gameover() {
  document.querySelector("body").style.backgroundColor = list[currentPlayer];
  document
    .getElementById("header")
    .getElementsByTagName("h1")[0].textContent = `Player ${currentPlayer} won!`;
}
function resetGame() {
  document.querySelector("body").style.backgroundColor = "#FFFFFF";
  currentPlayer = 1;
  document.getElementById("board").innerHTML = "";
  document.getElementById("header").getElementsByTagName("h1")[0].textContent =
    "Connect Four!";
  createBoard();
  updateBoard();
}
function performRoyalRumbleActions() {
  console.log("Royal Rumble has started!");

  let x = currentPlayer;

  if (x === 1) {
    // Retrieve the current value of variable1
    let currentVariable1 = localStorage.getItem("variable1");

    // Convert the current value to a number and increment it by 1
    let updatedVariable1 = parseInt(currentVariable1, 10) + 1;

    // Update variable1 in localStorage
    localStorage.setItem("variable1", updatedVariable1);
  } else {
    // Retrieve the current value of variable2
    let currentVariable2 = localStorage.getItem("variable2");

    // Convert the current value to a number and increment it by 1
    let updatedVariable2 = parseInt(currentVariable2, 10) + 1;

    // Update variable2 in localStorage
    localStorage.setItem("variable2", updatedVariable2);
  }

  // Retrieve the updated values from localStorage
  let updatedVariable1 = localStorage.getItem("variable1");
  let updatedVariable2 = localStorage.getItem("variable2");

  document
    .getElementById("header")
    .getElementsByTagName(
      "h1"
    )[0].textContent = `${currentPlayer} has ${updatedVariable1} point and player 2 has ${updatedVariable2} points!`;
  setTimeout(function () {
    window.location.href = "/pages/End.html";
  }, 1000);
}

createBoard();
