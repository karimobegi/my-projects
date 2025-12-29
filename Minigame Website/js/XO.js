function inv(n) {
  return 3 - n;
}
const Dict = {
  X: 1,
  O: 2,
};
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
const boardElement = document.getElementById("board");
const resultElement = document.getElementById("result");
const turnElement = document.getElementById("turn");

function renderBoard() {
  boardElement.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = board[i];
    cell.addEventListener("click", () => handleCellClick(i));
    boardElement.appendChild(cell);
  }
}

function handleCellClick(index) {
  if (board[index] === "" && !checkWinner()) {
    board[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
      resultElement.textContent = `${currentPlayer} wins!`;
      if (localStorage.getItem("royalRumbleStarted") === "true") {
        performRoyalRumbleActions();
      }
      turnElement.textContent = "";
    } else if (board.every((cell) => cell !== "")) {
      resultElement.textContent = "It's a draw!";
      turnElement.textContent = "";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      turnElement.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }

  return false;
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  resultElement.textContent = "";
  turnElement.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

renderBoard();
function performRoyalRumbleActions() {
  console.log("Royal Rumble has started!");

  let x = currentPlayer;

  if (x === "X") {
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
  resultElement.textContent = ` Player ${
    Dict[currentPlayer]
  } has 1 point and Player ${inv(Dict[currentPlayer])} has 0 points`;

  setTimeout(function () {
    window.location.href = "pigGame.html";
  }, 1000);
}
