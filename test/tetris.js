class Tetris {
    constructor() {
        this.trail          = [];
        this.lastPressed    = '';
        this.xSnake         = 0; // X Startpositie Snake
        this.ySnake         = 0; // Y Startpositie Snake
        this.xSnakeNew      = 0; // Nieuwe X positie Snake
        this.ySnakeNew      = 0; // Nieuwe Y positie Snake
        this.blockSize      = 10; // Grootte per blok in pixels
        this.canvaswidth    = 74 * this.blockSize; // Aantal blokken in Canvas
        this.canvasheight   = 48 * this.blockSize; // Aantal blokken in Canvas
        this.started        = false; // Spel nog niet gestart
        this.frameRate      = 1000; // Aantal frames per seconde
        // this.frameRate2     = 1000 / 100; // Aantal frames per seconde

        document.addEventListener("DOMContentLoaded", () => {
            this.createCanvas();
            this.canvas.addEventListener('click', this.start.bind(this));
            document.addEventListener('keydown', this.keyPressed.bind(this));
        });
    }

    start() {
        if (!this.started) {
            this.started = true;
            setInterval(this.game.bind(this), this.frameRate);
            // setInterval(this.game2.bind(this), this.frameRate2);
        }
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id', 'snakeCanvas');
        this.canvas.setAttribute('width', this.canvaswidth);
        this.canvas.setAttribute('height', this.canvasheight);
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    keyPressed() {
        const arrows = {
            ArrowLeft:  {x: -1},
            ArrowRight: {x: 1}
        };

        if (arrows[event.key]){
            this.xSnakeNew = arrows[event.key].x;
            this.lastPressed = event.key;
        }
    }

    // Deze functie is om simpel een blok te selecteren en rekening te houden met padding
    drawBlock(x, y, padding = 1) {
        this.ctx.fillRect(
            x * this.blockSize + padding,
            y * this.blockSize + padding,
            this.blockSize - (padding * 2),
            this.blockSize - (padding * 2)
        );
    }

    game() {
        this.ySnake += 1;

        if(this.xSnakeNew !== 0){
            this.xSnake += this.xSnakeNew;
            this.xSnakeNew = 0;

        }


        // Als de kant wordt geraakt door de slang
        this.xSnake = (this.xSnake < 0) ? this.canvaswidth -1    : this.xSnake;
        this.xSnake = (this.xSnake > this.canvaswidth - 1) ? 0   : this.xSnake;
        this.ySnake = (this.ySnake < 0) ? this.canvasheight -1    : this.ySnake;
        this.ySnake = (this.ySnake > this.canvasheight- 1) ? 0   : this.ySnake;

        // Rendering Canvas
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Rendering Snake
        this.ctx.fillStyle = 'aquamarine';
        for (let i = 0; i < this.trail.length; i++) {
            this.drawBlock(this.trail[i].x, this.trail[i].y);
            if (this.trail[i].x === this.xSnake && this.trail[i].y === this.ySnake) {
                this.currentTail = this.defaultTail;
            }
        }

        this.trail.push({x: this.xSnake, y: this.ySnake});
        while (this.trail.length > this.currentTail) {
            this.trail.shift();
        }
    }

    // game2() {
    //     this.ySnake += 1;
    //
    //     if(this.xSnakeNew !== 0){
    //         this.xSnake += this.xSnakeNew;
    //         this.xSnakeNew = 0;
    //
    //     }
    //
    //
    //     // Als de kant wordt geraakt door de slang
    //     this.xSnake = (this.xSnake < 0) ? this.blockCount -1    : this.xSnake;
    //     this.xSnake = (this.xSnake > this.blockCount - 1) ? 0   : this.xSnake;
    //     this.ySnake = (this.ySnake < 0) ? this.blockCount -1    : this.ySnake;
    //     this.ySnake = (this.ySnake > this.blockCount - 1) ? 0   : this.ySnake;
    //
    //     // Rendering Canvas
    //     this.ctx.fillStyle = 'black';
    //     this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    //
    //     // Rendering Snake
    //     this.ctx.fillStyle = 'aquamarine';
    //     for (let i = 0; i < this.trail.length; i++) {
    //         this.drawBlock(this.trail[i].x, this.trail[i].y);
    //         if (this.trail[i].x === this.xSnake && this.trail[i].y === this.ySnake) {
    //             this.currentTail = this.defaultTail;
    //         }
    //     }
    //
    //     this.trail.push({x: this.xSnake, y: this.ySnake});
    //     while (this.trail.length > this.currentTail) {
    //         this.trail.shift();
    //     }
    //
    //     this.ctx.fillStyle = 'red';
    //     this.drawBlock(this.xApple, this.yApple, 4);
    //     if (this.xApple === this.xSnake && this.yApple === this.ySnake) {
    //         this.currentTail++;
    //         this.newApple();
    //     }
    // }
}

new Tetris();





