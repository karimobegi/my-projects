let currentVariable1 = localStorage.getItem("variable1");
let currentVariable2 = localStorage.getItem("variable2");
if (currentVariable1 < currentVariable2) {
  document.querySelector("body").style.backgroundColor = "#ff0000";
}
localStorage.setItem("royalRumbleStarted", "false");
localStorage.setItem("variable1", "0");
localStorage.setItem("variable1", "0");
