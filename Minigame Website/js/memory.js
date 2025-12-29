const cards = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
];
let flippedCards = [];
let matchedCards = [];
let lives = 7;
let highScore = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateGameInfo() {
  document.getElementById("lives").textContent = lives;
  document.getElementById("highscore").textContent = highScore;
}

function createGameBoard() {
  const gameBoard = document.getElementById("game-board");
  shuffleArray(cards);

  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.index = index;
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  const selectedCard = this;
  const index = selectedCard.dataset.index;

  if (!flippedCards.includes(index) && flippedCards.length < 2) {
    flippedCards.push(index);
    selectedCard.textContent = cards[index];

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const [firstCardIndex, secondCardIndex] = flippedCards;
  const firstCard = document.querySelector(
    `.card[data-index="${firstCardIndex}"]`
  );
  const secondCard = document.querySelector(
    `.card[data-index="${secondCardIndex}"]`
  );

  if (cards[firstCardIndex] === cards[secondCardIndex]) {
    matchedCards.push(firstCardIndex, secondCardIndex);
    if (matchedCards.length === cards.length) {
      document.querySelector("body").style.backgroundColor = "#60b347";

      document.querySelector("h1").textContent = "Congratulations You Won! 🏆";
      if (lives > highScore) {
        highScore = lives;
        updateGameInfo();
      }
    }
  } else {
    lives -= 1;
    updateGameInfo();

    if (lives === 0) {
      document.body.classList.add("lose");
      document.querySelector("body").style.backgroundColor = "#ff0000";
      document.querySelector("h1").textContent =
        "Game Over! You ran out of lives. ❌";
      flippedCards = cards;
    } else {
      setTimeout(() => {
        firstCard.textContent = "";
        secondCard.textContent = "";
      }, 500);
    }
  }

  flippedCards = [];
}

function resetGame() {
  document.querySelector("h1").textContent = "Memory Match Game 🤔";
  flippedCards = [];
  matchedCards = [];
  lives = 7;
  updateGameInfo();
  document.querySelector("body").style.backgroundColor = "#FFFFFF";
  document.body.classList.remove("win", "lose");

  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  createGameBoard();
}

createGameBoard();
updateGameInfo();
