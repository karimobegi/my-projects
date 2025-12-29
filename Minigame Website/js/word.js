let secretWord;
let guessedWord = [];
let attempts = 0;
let highscore = localStorage.getItem("wordleHighscore") || Infinity;
const maxAttempts = 6;

function startGame() {
  secretWord = generateRandomWord();
  guessedWord = Array(secretWord.length).fill("_");
  displayWord();
}

function generateRandomWord() {
  const words = [
    "apple",
    "table",
    "chair",
    "plane",
    "happy",
    "zebra",
    "ocean",
    "smile",
    "robot",
    "music",
  ];
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  document.getElementById("word-display").innerText = guessedWord.join(" ");
}

function checkGuess() {
  const inputBox = document.getElementById("input-box");
  const guess = inputBox.value.toLowerCase();

  if (guess.length !== secretWord.length) {
    alert("Please enter a 5-letter word.");
    return;
  }

  attempts++;

  let feedback = "";

  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === guess[i]) {
      guessedWord[i] = guess[i];
    }
  }

  displayWord();

  if (guessedWord.join("") === secretWord) {
    feedback = `Congratulations! You guessed the word "${secretWord}" in ${attempts} attempts.`;
    endGame(true);
  } else if (attempts === maxAttempts) {
    feedback = `Sorry, you've run out of attempts. The correct word was "${secretWord}".`;
    endGame(false);
  } else {
    inputBox.value = "";
    feedback = `Incorrect guess. Attempts left: ${maxAttempts - attempts}`;
  }

  document.getElementById("feedback").innerText = feedback;
}

function endGame(isWinner) {
  document.getElementById("input-box").disabled = true;
  document.getElementById("submit-button").disabled = true;

  if (isWinner) {
    document.body.style.backgroundColor = "green";
    if (attempts < highscore) {
      highscore = attempts;
      localStorage.setItem("wordleHighscore", highscore);
    }
  } else {
    document.body.style.backgroundColor = "red";
  }

  document.getElementById("highscore").innerText = `Highscore: ${highscore}`;
}

function restartGame() {
  attempts = 0;
  document.getElementById("input-box").disabled = false;
  document.getElementById("submit-button").disabled = false;
  document.body.style.backgroundColor = "";
  startGame();
  document.getElementById("input-box").value = "";
  document.getElementById("feedback").innerText = "";
}

startGame();
function handleKeyPress(event) {
  if (event.key === "Enter") {
    checkGuess();
  }
}

function enableGame() {
  document.getElementById("input-box").disabled = false;
  document.getElementById("submit-button").disabled = false;
}

function restartGame() {
  attempts = 0;
  startGame();
  document.querySelector("body").style.backgroundColor = "#FFFFFF";
  document.getElementById("input-box").disabled = false;
  document.getElementById("submit-button").disabled = false;
  document.getElementById("feedback").innerText = "";
}

document.addEventListener("DOMContentLoaded", function () {
  startGame();
  document
    .getElementById("input-box")
    .addEventListener("keypress", handleKeyPress);
});
