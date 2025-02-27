window.onload = function () {
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
let game;

startButton.addEventListener("click", function(){
    startGame();
});

function startGame(){
    game = new Game();
    game.start();
}

}