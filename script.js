window.onload = function () {
    const startButton = document.getElementById("start-btn");
    const restartButton = document.getElementById("restart-btn");
    let game;
  
    startButton.addEventListener("click", function () {
      startGame();
    });
  
    function startGame() {
      game = new Game();
      game.start();
    }
  
    function keyStrokes(event) {
      const key = event.key;
      const allowedKeyStrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
      ];
      
      
      if (allowedKeyStrokes.includes(key)) {
          event.preventDefault();
  
          
          switch (key) {
            case "ArrowLeft":
              game.player.directionX = -2.5;
              break;
            case "ArrowUp":
              game.player.directionY = -2.5;
              break;
            case "ArrowRight":
              game.player.directionX = 2.5;
              break;
            case "ArrowDown":
              game.player.directionY = 2.5;
              break;
          }
        }
    }
  
    window.addEventListener("keydown", keyStrokes);
  
    restartButton.addEventListener("click", function(){
      restartGame();
    });

    function restartGame(){
      location.reload();
    }
  
  };
  