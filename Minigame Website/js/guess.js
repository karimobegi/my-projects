"use strict";

let secret = Math.trunc(20 * Math.random()) + 1;
let score = 10;
let highscore = 0;

const display = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess);

  if (!guess) {
    display("There is no Number!");
  } else if (guess === secret) {
    display("Correct Number !");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secret;
    if (highscore < score) {
      highscore = score;
    }

    document.querySelector(".highscore").textContent = highscore;
  } else if (guess !== secret) {
    if (score > 0) {
      display(guess > secret ? "Too high" : "Too low");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      display("You lost :(");
      document.querySelector("body").style.backgroundColor = "#ff0000";
    }
  }
});
document.querySelector(".again").addEventListener("click", function () {
  secret = Math.trunc(20 * Math.random()) + 1;
  if (
    highscore < score &&
    document.querySelector(".message").textContent === "Correct Number !"
  ) {
    highscore = score;
    document.querySelector(".highscore").textContent = highscore;
  }
  score = 10;

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = " ";
  display("Start guessing...");
  document.querySelector(".score").textContent = score;
});
