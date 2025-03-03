class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameOutroScreen = document.getElementById("game-outro");
    this.player = new Player(this.gameScreen, 200, 500, 100, 100, "./star.png");
    this.width = 800;
    this.height = 450;
    this.obstacles = [];
    this.score = 0;
    this.lives = 10;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");
    this.healthBar = document.getElementById("health-bar");

    this.gameInfo();
  }

  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    console.log("obscura is running");

    this.update();

    this.changeBgColor();

    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    this.player.move();

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        document.body.style.backgroundColor = "#252522";
        setTimeout(() => {
          document.body.style.backgroundColor = "";
        }, 50);
        this.obstacles.splice(i, 1);
        this.lives--;
        this.updateHealthBar();
        i--;
        this.gameInfo();
      } else if (obstacle.top > this.height) {
        this.score++;
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
        this.gameInfo();
      }
    }

    if (this.lives === 0) {
      this.endGame();
    }

    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }

  updateHealthBar() {
    const healthPercentage = (this.lives / 10) * 100;
    this.healthBar.style.width = `${healthPercentage}%`;
  }

  gameInfo() {
    this.scoreElement.textContent = this.score;
    this.livesElement.textContent = this.lives;
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach(function (obstacle) {
      this.obstacle.element.remove();
    });

    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameOutroScreen.style.display = "block";
  }
}
