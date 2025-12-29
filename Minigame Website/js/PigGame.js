let bootton = document.getElementById("home-button");

if (localStorage.getItem("royalRumbleStarted") === "true") {
  bootton.style.display = "none";
}

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `/images/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      endGame();
      // Finish the game
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
function endGame() {
  if (localStorage.getItem("royalRumbleStarted") === "true") {
    // Call the function or perform actions related to Royal Rumble
    performRoyalRumbleActions();
  }
  playing = false;
  diceEl.classList.add("hidden");

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
}
function performRoyalRumbleActions() {
  console.log("Royal Rumble has started!");

  let x = activePlayer;

  if (x === 0) {
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

  function change() {
    setTimeout(function () {
      window.location.href = "coFour.html";
    }, 1000);
  }
  change();
}
