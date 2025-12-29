let Royal = false;
let globalScore = 0;
document.querySelectorAll(".score").forEach((element) => {
  element.textContent = `Score: ${globalScore}`;
});
function Start() {
  localStorage.setItem("royalRumbleStarted", "true");
  localStorage.setItem("variable1", "0");
  localStorage.setItem("variable2", "0");

  window.location.href = "/games/XO.html";
}
