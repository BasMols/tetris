class Tetris {
    constructor() {
        this.run       = 0;
        this.x         = 0; // X changing position 
        this.y         = 0; // Y changing position 
        this.xDefault  = 15; // X Startpositie
        this.yDefault  = 0; // Y Startpositie 
        this.xNew      = 0; // Nieuwe X positie 
        this.blockSize      = 10; // Grootte per blok in pixels
        this.canvaswidth    = 30 * this.blockSize;
        this.canvasheight   = 60 * this.blockSize;
        this.started        = false; // Spel nog niet gestart
        this.frameRate      = 100; // Aantal frames per seconde
        this.blocks         = [];
        this.shape1         = {
            x1:0, y1:1,
            x2:0, y2:2,
            x3:0, y3:3,
            color:"aquamarine"
        }


        document.addEventListener("DOMContentLoaded", () => {
            this.createCanvas();
            this.canvas.addEventListener('click', this.start.bind(this));
        });
    }

    start() {
        if (!this.started) {
            this.started = true;
            document.addEventListener('keydown', this.keyPressed.bind(this));
            this.reset();
        }
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id', 'Canvas');
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
            this.xNew = arrows[event.key].x;
        }

        this.x += this.xNew;

        if (
            this.x >= this.canvaswidth / this.blockSize ||
            this.x < 0 ||
            this.x + this.activeshape.x1 >= this.canvaswidth / this.blockSize ||
            this.x + this.activeshape.x1 < 0 ||
            this.x + this.activeshape.x2 >= this.canvaswidth / this.blockSize ||
            this.x + this.activeshape.x2 < 0 ||
            this.x + this.activeshape.x3 >= this.canvaswidth / this.blockSize ||
            this.x + this.activeshape.x3 < 0
        ){
            this.x -= this.xNew;

        } else {

            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            //Render existing blocks
            for (let i = 0; i < this.blocks.length; i++) {
                this.drawBlock(this.blocks[i].x, this.blocks[i].y, this.blocks[i].color);
            }

            this.drawBlock(this.x, this.y, this.activeshape.color);
            this.drawBlock(this.x + this.activeshape.x1 , this.y + this.activeshape.y1, this.activeshape.color);
            this.drawBlock(this.x + this.activeshape.x2 , this.y + this.activeshape.y2, this.activeshape.color);
            this.drawBlock(this.x + this.activeshape.x3 , this.y + this.activeshape.y3, this.activeshape.color);

            this.xNew = 0;

        }


        // for (let i = 0; i < this.blocks.length; i++) {
        //     if (
        //         this.y + 1 === this.blocks[i].y && this.x === this.blocks[i].x ||
        //         this.y + this.activeshape.y1 + 1 === this.blocks[i].y && this.x + this.activeshape.x1 === this.blocks[i].x ||
        //         this.y + this.activeshape.y2 + 1 === this.blocks[i].y && this.x + this.activeshape.x2 === this.blocks[i].x ||
        //         this.y + this.activeshape.y3 + 1 === this.blocks[i].y && this.x + this.activeshape.x3 === this.blocks[i].x
        //     ) {
        //         this.reset()
        //     }
        // }

    }

    // Deze functie is om simpel een blok te selecteren en rekening te houden met padding
    drawBlock(x, y, color,padding = 1) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            x * this.blockSize + padding,
            y * this.blockSize + padding,
            this.blockSize - (padding * 2),
            this.blockSize - (padding * 2)
        );
    }

    reset() {
        clearInterval(this.interval);

        if(this.run !== 0){

            this.blocks.push(
                {x: this.x, y: this.y, color: this.activeshape.color},
                {x: this.x + this.activeshape.x1, y: this.y + this.activeshape.y1, color: this.activeshape.color},
                {x: this.x + this.activeshape.x2, y: this.y + this.activeshape.y2, color: this.activeshape.color},
                {x: this.x + this.activeshape.x3, y: this.y + this.activeshape.y3, color: this.activeshape.color}
            );

        }

        this.run += 1;
        console.log(this.run);
        this.x = this.xDefault;
        this.y = this.yDefault;
        this.activeshape = this.shape1;
        this.interval = setInterval(this.game.bind(this), this.frameRate);
    }
    game() {
        this.y += 1;

        if (
            this.y + 1 >= this.canvasheight / this.blockSize ||
            this.y + this.activeshape.y1 + 1 >= this.canvasheight / this.blockSize||
            this.y + this.activeshape.y2 + 1 >= this.canvasheight / this.blockSize||
            this.y + this.activeshape.y3 + 1 >= this.canvasheight / this.blockSize
        ){
            this.reset()
        }


        for (let i = 0; i < this.blocks.length; i++) {
            if (
                this.y + 1 === this.blocks[i].y && this.x === this.blocks[i].x ||
                this.y + this.activeshape.y1 + 1 === this.blocks[i].y && this.x + this.activeshape.x1 === this.blocks[i].x ||
                this.y + this.activeshape.y2 + 1 === this.blocks[i].y && this.x + this.activeshape.x2 === this.blocks[i].x ||
                this.y + this.activeshape.y3 + 1 === this.blocks[i].y && this.x + this.activeshape.x3 === this.blocks[i].x
            ) {
                this.reset()
            }
        }


        // Rendering Canvas
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //Render existing blocks
        for (let i = 0; i < this.blocks.length; i++) {
            this.drawBlock(this.blocks[i].x, this.blocks[i].y, this.blocks[i].color);
        }

        // Rendering
        this.drawBlock(this.x, this.y, this.activeshape.color);
        this.drawBlock(this.x + this.activeshape.x1 , this.y + this.activeshape.y1, this.activeshape.color);
        this.drawBlock(this.x + this.activeshape.x2 , this.y + this.activeshape.y2, this.activeshape.color);
        this.drawBlock(this.x + this.activeshape.x3 , this.y + this.activeshape.y3, this.activeshape.color);


    }

}

new Tetris();





