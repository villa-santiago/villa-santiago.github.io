class Game {
    constructor(){
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameOutroScreen = document.getElementById("game-outro");
        this.player = null;
        this.width = 800;
        this.height = 450;
        this.obstacles = [];
        this.score = 0;
        this.lives = 0;
        this.gameIsOver = false;
        this.gameIntervalId;
        this.gameLoopFrequency = Math.round(1000/60);
    }

    start() {
        this.gameScreen.style.width = `${this.width}px`;
        this.gameScreen.style.height = `${this.height}px`;

        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";

        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)
    }

    gameLoop(){
        this.update();
        if (this.gameIsOver){
            clearInterval(this.gameIntervalId);
        }
    }
    update() {
        
    }
}