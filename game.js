class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameOutroScreen = document.getElementById("game-outro");
    this.player = new Player(this.gameScreen, 200, 500, 209, 171, "./character.png");
    this.width = 900;
    this.height = 450;
    this.obstacles = [];
    this.positiveObstacles = [];
    this.score = 0;
    this.lives = 10;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("liveschar");
    this.healthBar = document.getElementById("health-bar");
    this.backgroundImages = [
      "./background2.png",
      "./background3.png",
      "./background4.png",
      "./background5.png",
      "./background6.png",
    ];
    this.currentBgIndex = 0;
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
    console.log("the road is long, the road is dark");

    this.update();


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

    for (let i = 0; i < this.positiveObstacles.length; i++) {
      const posObstacle = this.positiveObstacles[i];
      posObstacle.move();

      if (this.player.didCollide(posObstacle)) {
        posObstacle.element.remove();
        this.positiveObstacles.splice(i, 1);

        if (this.lives < 10) {
          this.lives++;
          this.updateHealthBar();
        }

        i--;
        this.gameInfo();
      } else if (posObstacle.top > this.height) {
        posObstacle.element.remove();
        this.positiveObstacles.splice(i, 1);
        i--;
      }
    }

    if (this.lives === 0) {
      this.endGame();
    }

    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

    if (Math.random() > 0.995 && this.positiveObstacles.length < 1) {
      this.positiveObstacles.push(new PositiveObstacle(this.gameScreen));
    }
  }

  updateHealthBar() {
    const healthPercentage = (this.lives / 10) * 100;
    this.healthBar.style.width = `${healthPercentage}%`;
  }

  gameInfo() {
    this.scoreElement.textContent = this.score;
    this.livesElement.textContent = this.lives;

    if (this.score % 10 === 0 && this.score !== 0) {
      this.changeBackground();
    }
  }

  changeBackground() {
    this.currentBgIndex =
      (this.currentBgIndex + 1) % this.backgroundImages.length;
    this.gameScreen.style.backgroundImage = `url(${
      this.backgroundImages[this.currentBgIndex]
    })`;
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
