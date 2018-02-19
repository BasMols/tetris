class Tetris {
    constructor() {
        this.run            = 0;
        this.x              = 0; // X changing position
        this.y              = 0; // Y changing position
        this.xDefault       = 5; // X Startpositie
        this.yDefault       = -2; // Y Startpositie
        this.xNew           = 0; // Nieuwe X positie
        this.blockSize      = 40; // Grootte per blok in pixels
        this.canvaswidth    = 10 * this.blockSize;
        this.canvasheight   = 20 * this.blockSize;
        this.started        = false; // Spel nog niet gestart
        this.frameRate      = 500; // Aantal frames per seconde
        this.blocks         = [];
        this.shapes         = [
            {
                1: {x: 1 ,y: 0},
                2: {x: 2 ,y: 0},
                3: {x: 3 ,y: 0},
                color:"cyan"
            }, // I
            {
                1: {x: 0 ,y: 1},
                2: {x: 1 ,y: 1},
                3: {x: 1 ,y: 0},
                color:"yellow"
            }, // O
            {
                1: {x: 1 ,y: 0},
                2: {x: 0 ,y: -1},
                3: {x: -1 ,y: 0},
                color:"purple"
            }, // T
            {
                1: {x: 1 ,y: 0},
                2: {x: 0 ,y: 1},
                3: {x: -1 ,y: 1},
                color:"green"
            }, // S
            {
                1: {x: -1 ,y: 0},
                2: {x: 0 ,y: 1},
                3: {x: 1 ,y: 1},
                color:"red"
            }, // Z
            {
                1: {x: 0 ,y: 1},
                2: {x: 1 ,y: 1},
                3: {x: 2 ,y: 1},
                color:"blue"
            }, // J
            {
                1: {x: 1 ,y: 0},
                2: {x: 2 ,y: 0},
                3: {x: 2 ,y: -1},
                color:"orange"
            }, // L
        ];


        document.addEventListener("DOMContentLoaded", () => {
            this.createCanvas();
            this.canvas.addEventListener('click', this.start.bind(this));
        });
    }

    //random int generator
    getRandomInt() {
        return Math.floor(Math.random() * Math.floor(7));
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

    checkBottom() {
        return !(
            this.y                         >= this.canvasheight / this.blockSize ||
            this.y + this.activeshape[1].y >= this.canvasheight / this.blockSize ||
            this.y + this.activeshape[2].y >= this.canvasheight / this.blockSize ||
            this.y + this.activeshape[3].y >= this.canvasheight / this.blockSize
        );



        for (let i = 0; i < this.blocks.length; i++) {
            if (
                this.y                         === this.blocks[i].y && this.x                         === this.blocks[i].x ||
                this.y + this.activeshape[1].y === this.blocks[i].y && this.x + this.activeshape[1].x === this.blocks[i].x ||
                this.y + this.activeshape[2].y === this.blocks[i].y && this.x + this.activeshape[2].x === this.blocks[i].x ||
                this.y + this.activeshape[3].y === this.blocks[i].y && this.x + this.activeshape[3].x === this.blocks[i].x
            ) {
                return false;
            }
        }
        return true;
    }
    check2() {
        if ( //Checks if any of the blocks hit the right side of the screen.
            this.x                          >= this.canvaswidth / this.blockSize ||
            this.x + this.activeshape[1].x  >= this.canvaswidth / this.blockSize ||
            this.x + this.activeshape[2].x  >= this.canvaswidth / this.blockSize ||
            this.x + this.activeshape[3].x  >= this.canvaswidth / this.blockSize ||
            //Checks if any of the blocks hit the left side of the screen.
            this.x                          < 0 ||
            this.x + this.activeshape[1].x  < 0 ||
            this.x + this.activeshape[2].x  < 0 ||
            this.x + this.activeshape[3].x  < 0
        ){
            return false
        } else {
            return true
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

    render() {
        // Rendering Canvas
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //Render existing blocks
        for (let i = 0; i < this.blocks.length; i++) {
            this.drawBlock(this.blocks[i].x, this.blocks[i].y, this.blocks[i].color);
        }

        // Rendering
        this.drawBlock(this.x, this.y, this.activeshape.color);
        this.drawBlock(this.x + this.activeshape[1].x , this.y + this.activeshape[1].y, this.activeshape.color);
        this.drawBlock(this.x + this.activeshape[2].x , this.y + this.activeshape[2].y, this.activeshape.color);
        this.drawBlock(this.x + this.activeshape[3].x , this.y + this.activeshape[3].y, this.activeshape.color);
    }

    start() {
        if (!this.started) {
            this.started = true;
            document.addEventListener('keydown', this.keyPressed.bind(this));
            this.reset();
        }
    }

    keyPressed() {
        const arrows = {
            ArrowLeft:  {x: -1},
            ArrowRight: {x: 1}
        };
            this.xNew = arrows[event.key].x;

            this.x += this.xNew;

            if (this.check2()){

                this.render();
                this.xNew = 0;

            } else {
                this.x -= this.xNew;
            }


    }


    reset() {
        clearInterval(this.interval);

        if(this.run !== 0){
            this.blocks.push(
                {x: this.x, y: this.y, color: this.activeshape.color},
                {x: this.x + this.activeshape[1].x, y: this.y + this.activeshape[1].y, color: this.activeshape.color},
                {x: this.x + this.activeshape[2].x, y: this.y + this.activeshape[2].y, color: this.activeshape.color},
                {x: this.x + this.activeshape[3].x, y: this.y + this.activeshape[3].y, color: this.activeshape.color}
            );

        }

        this.run += 1;
        this.x = this.xDefault;
        this.y = this.yDefault;
        this.activeshape = this.shapes[this.getRandomInt()];
        this.interval = setInterval(this.game.bind(this), this.frameRate);
    }


    game() {


        this.y++;

        if (!this.checkBottom()){
            this.y --;
            this.reset();
        } else {
            this.render();
        }

    }

}

new Tetris();





