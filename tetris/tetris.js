class Tetris {
    constructor() {
        this.run            = 0;
        this.frame          = 0;
        this.x              = 0; // X changing position
        this.y              = 0; // Y changing position
        this.ghostY         = 0; // Y ghost
        this.ghostcolor     = 'darkgrey';
        this.ghostframe     = 0;
        this.xDefault       = 5; // X Startpositie
        this.yDefault       = -2; // Y Startpositie
        this.rotation       = 0; // Current rotation
        this.blockSize      = 40; // Grootte per blok in pixels
        this.canvaswidth    = 10 * this.blockSize;
        this.canvasheight   = 20 * this.blockSize;
        this.started        = false; // Spel nog niet gestart
        this.frameRate      = 500; // Aantal frames per seconde
        this.blocks         = []; // This array will contain objects off all existing (non moving) blocks.
        this.row            = [];
        this.shapes         = [
            {
                0: {
                    0: {x: 0, y: 1},
                    1: {x: 1, y: 1},
                    2: {x: 2, y: 1},
                    3: {x: 3, y: 1},
                },
                1: {
                    0: {x: 2, y: 0},
                    1: {x: 2, y: 1},
                    2: {x: 2, y: 2},
                    3: {x: 2, y: 3},
                },
                2: {
                    0: {x: 0, y: 2},
                    1: {x: 1, y: 2},
                    2: {x: 2, y: 2},
                    3: {x: 3, y: 2},
                },
                3: {
                    0: {x: 1, y: 0},
                    1: {x: 1, y: 1},
                    2: {x: 1, y: 2},
                    3: {x: 1, y: 3},
                },
                color:"cyan"
            }, // I
            {
                0: {
                    0: {x: 1, y: 1},
                    1: {x: 1, y: 2},
                    2: {x: 2, y: 1},
                    3: {x: 2, y: 2},
                },
                1: {
                    0: {x: 1, y: 1},
                    1: {x: 1, y: 2},
                    2: {x: 2, y: 1},
                    3: {x: 2, y: 2},
                },
                2: {
                    0: {x: 1, y: 1},
                    1: {x: 1, y: 2},
                    2: {x: 2, y: 1},
                    3: {x: 2, y: 2},
                },
                3: {
                    0: {x: 1, y: 1},
                    1: {x: 1, y: 2},
                    2: {x: 2, y: 1},
                    3: {x: 2, y: 2},
                },
                color:"yellow"
            }, // O
            {
                0: {
                    0: {x: 1, y: 0},
                    1: {x: 0, y: 1},
                    2: {x: 1, y: 1},
                    3: {x: 2, y: 1},
                },
                1: {
                    0: {x: 1, y: 0},
                    1: {x: 1, y: 1},
                    2: {x: 2, y: 1},
                    3: {x: 1, y: 2},
                },
                2: {
                    0: {x: 0, y: 1},
                    1: {x: 1, y: 1},
                    2: {x: 2, y: 1},
                    3: {x: 1, y: 2},
                },
                3: {
                    0: {x: 1, y: 0},
                    1: {x: 0, y: 1},
                    2: {x: 1, y: 1},
                    3: {x: 1, y: 2},
                },
                color:"purple"
            }, // T
            {
                0: {
                    0: {x: 1, y: 0},
                    1: {x: 2, y: 0},
                    2: {x: 0, y: 1},
                    3: {x: 1, y: 1},
                },
                1: {
                    0: {x: 1, y: 0},
                    1: {x: 1, y: 1},
                    2: {x: 2, y: 1},
                    3: {x: 2, y: 2},
                },
                2: {
                    0: {x: 1, y: 1},
                    1: {x: 2, y: 1},
                    2: {x: 0, y: 2},
                    3: {x: 1, y: 2},
                },
                3: {
                    0: {x: 0, y: 0},
                    1: {x: 0, y: 1},
                    2: {x: 1, y: 1},
                    3: {x: 1, y: 2},
                },
                color:"green"
            }, // S
            {
                0: {
                    0: {x: 0, y: 0},
                    1: {x: 1, y: 0},
                    2: {x: 1, y: 1},
                    3: {x: 2, y: 1},
                },
                1: {
                    0: {x: 2, y: 0},
                    1: {x: 1, y: 1},
                    2: {x: 2, y: 1},
                    3: {x: 1, y: 2},
                },
                2: {
                    0: {x: 0, y: 1},
                    1: {x: 1, y: 1},
                    2: {x: 1, y: 2},
                    3: {x: 2, y: 2},
                },
                3: {
                    0: {x: 1, y: 0},
                    1: {x: 0, y: 1},
                    2: {x: 1, y: 1},
                    3: {x: 0, y: 2},
                },
                color:"red"
            }, // Z
            {
                0: {
                    0: {x: 0, y: 0},
                    1: {x: 0, y: 1},
                    2: {x: 1, y: 1},
                    3: {x: 2, y: 1},
                },
                1: {
                    0: {x: 1, y: 0},
                    1: {x: 2, y: 0},
                    2: {x: 1, y: 1},
                    3: {x: 1, y: 2},
                },
                2: {
                    0: {x: 0, y: 1},
                    1: {x: 1, y: 1},
                    2: {x: 2, y: 1},
                    3: {x: 2, y: 2},
                },
                3: {
                    0: {x: 1, y: 0},
                    1: {x: 1, y: 1},
                    2: {x: 1, y: 2},
                    3: {x: 0, y: 2},
                },
                color:"blue"
            }, // J
            {
                0: {
                    0: {x: 0, y: 1},
                    1: {x: 1, y: 1},
                    2: {x: 2, y: 1},
                    3: {x: 2, y: 0},
                },
                1: {
                    0: {x: 1, y: 0},
                    1: {x: 1, y: 1},
                    2: {x: 1, y: 2},
                    3: {x: 2, y: 2},
                },
                2: {
                    0: {x: 0, y: 1},
                    1: {x: 0, y: 2},
                    2: {x: 1, y: 1},
                    3: {x: 2, y: 1},
                },
                3: {
                    0: {x: 0, y: 0},
                    1: {x: 1, y: 0},
                    2: {x: 1, y: 1},
                    3: {x: 1, y: 2},
                },
                color:"orange"
            } // L
        ];

        document.addEventListener("DOMContentLoaded", () => {
            this.createCanvas();
            this.canvas.addEventListener('click', this.start.bind(this));
        });
    }

    //random int generator
    static getRandomInt() {
        return Math.floor(Math.random() * Math.floor(7));
    }

    // Function to create the canvas element
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

    // Function to draw a block
    drawBlock(x, y, color, padding = 1) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            x * this.blockSize + padding,
            y * this.blockSize + padding,
            this.blockSize - (padding * 2),
            this.blockSize - (padding * 2)
        );
    }

    // Function to push the active shape to the blocks array
    push() {
        this.blocks.push(
            {x: this.x + this.activeshape[this.rotation][0].x, y: this.y + this.activeshape[this.rotation][0].y, color: this.activeshape.color},
            {x: this.x + this.activeshape[this.rotation][1].x, y: this.y + this.activeshape[this.rotation][1].y, color: this.activeshape.color},
            {x: this.x + this.activeshape[this.rotation][2].x, y: this.y + this.activeshape[this.rotation][2].y, color: this.activeshape.color},
            {x: this.x + this.activeshape[this.rotation][3].x, y: this.y + this.activeshape[this.rotation][3].y, color: this.activeshape.color}
        );
    }

    // Function to render the background / the active blocks / the existing blocks using the drawBlock() Function
    render() {
        // Rendering Canvas
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //Render existing blocks
        for (let i = 0; i < this.blocks.length; i++) {
            this.drawBlock(this.blocks[i].x, this.blocks[i].y, this.blocks[i].color);
        }

        // Render ghost blocks
        this.drawBlock(this.x + this.activeshape[this.rotation][0].x, this.ghostY + this.activeshape[this.rotation][0].y, this.ghostcolor);
        this.drawBlock(this.x + this.activeshape[this.rotation][1].x, this.ghostY + this.activeshape[this.rotation][1].y, this.ghostcolor);
        this.drawBlock(this.x + this.activeshape[this.rotation][2].x, this.ghostY + this.activeshape[this.rotation][2].y, this.ghostcolor);
        this.drawBlock(this.x + this.activeshape[this.rotation][3].x, this.ghostY + this.activeshape[this.rotation][3].y, this.ghostcolor);

        // Rendering
        this.drawBlock(this.x + this.activeshape[this.rotation][0].x, this.y + this.activeshape[this.rotation][0].y, this.activeshape.color);
        this.drawBlock(this.x + this.activeshape[this.rotation][1].x, this.y + this.activeshape[this.rotation][1].y, this.activeshape.color);
        this.drawBlock(this.x + this.activeshape[this.rotation][2].x, this.y + this.activeshape[this.rotation][2].y, this.activeshape.color);
        this.drawBlock(this.x + this.activeshape[this.rotation][3].x, this.y + this.activeshape[this.rotation][3].y, this.activeshape.color);
    }

    remove(row) {

        this.blocks = this.blocks.filter(function (el) {
            return el.y !== row;
        });
        for (let i = 0; i < this.blocks.length; i++){
            if (this.blocks[i].y < row){
                this.blocks[i].y++;
            }
        }

    }



    // Function to check if the active shape is at the bottom
    checkBottom(y) {
        return !(
            y + this.activeshape[this.rotation][0].y >= this.canvasheight / this.blockSize ||
            y + this.activeshape[this.rotation][1].y >= this.canvasheight / this.blockSize ||
            y + this.activeshape[this.rotation][2].y >= this.canvasheight / this.blockSize ||
            y + this.activeshape[this.rotation][3].y >= this.canvasheight / this.blockSize
        );
    }

    // Function to check if the active shape is a the existing blocks
    checkBox(x, y) {
        for (let i = 0; i < this.blocks.length; i++) {
            if (
                y + this.activeshape[this.rotation][0].y === this.blocks[i].y && x + this.activeshape[this.rotation][0].x === this.blocks[i].x ||
                y + this.activeshape[this.rotation][1].y === this.blocks[i].y && x + this.activeshape[this.rotation][1].x === this.blocks[i].x ||
                y + this.activeshape[this.rotation][2].y === this.blocks[i].y && x + this.activeshape[this.rotation][2].x === this.blocks[i].x ||
                y + this.activeshape[this.rotation][3].y === this.blocks[i].y && x + this.activeshape[this.rotation][3].x === this.blocks[i].x
            ) {
                return false;
            }
        }
        return true;
    }

    // Function to check if the active shape will hit the side of screen
    checkSides() {
        return !( //Checks if any of the blocks hit the right side of the screen.
            this.x + this.activeshape[this.rotation][0].x >= this.canvaswidth / this.blockSize ||
            this.x + this.activeshape[this.rotation][1].x >= this.canvaswidth / this.blockSize ||
            this.x + this.activeshape[this.rotation][2].x >= this.canvaswidth / this.blockSize ||
            this.x + this.activeshape[this.rotation][3].x >= this.canvaswidth / this.blockSize ||

            //Checks if any of the blocks hit the left side of the screen.
            this.x + this.activeshape[this.rotation][0].x < 0 ||
            this.x + this.activeshape[this.rotation][1].x < 0 ||
            this.x + this.activeshape[this.rotation][2].x < 0 ||
            this.x + this.activeshape[this.rotation][3].x < 0
        );
    }

    // Checks the ghost
    checkGhost() {
        this.ghostY = this.y;
        this.ghostframe = 0;
        for (let i = 0; i < this.canvasheight / this.blockSize - this.y; i++) {
            if (this.checkBottom(this.ghostY) && this.checkBox(this.x, this.ghostY)) {
                this.ghostY++;
                this.ghostframe++;
            } else {
                this.ghostY--;
                return;
            }
        }
    }


    checkRows() {
        for (let o = 0; o < this.canvasheight / this.blockSize; o++) {
            let row = 0;
            for (let i = 0; i < this.blocks.length; i++){
                if (this.blocks[i].y === o){
                    row++;
                }
            }

            if (row === this.canvaswidth / this.blockSize){
                this.remove(o);
            }
        }
    }



    // Function to run when any key is pressed
    keyPressed() {
        if (this.started){
            const keys = {
                ArrowLeft:  {event: -1},
                ArrowRight: {event: 1},
                ArrowUp: {event: 'rotateright'},
                ArrowDown: {event: 'hardLock'}
            };

            const dir = keys[event.key].event;
            if (dir === -1 || dir === 1) {
                this.arrowKeys(dir);
            } else if (dir === 'rotateright' || dir === 'rotateleft') {
                this.rotate(dir);
            } else if (dir === 'hardLock'){
                this.hardLock();
            }

        }

    }

    arrowKeys(dir) {

        this.x += dir;
        if (this.checkSides() && this.checkBox(this.x, this.y)) {
            this.checkGhost();
            this.render();
        } else {
            this.x -= dir;
        }

    }

    hardLock(){
        this.checkGhost();
        this.y = this.ghostY;
        this.frame += this.ghostframe;
        this.render();
        this.reset();
    }

    rotate(dir) {

        if (dir === 'rotateright') {

            if (this.rotation === 3){
                this.rotation = -1
            }
            this.rotation ++;
            this.checkGhost();
            this.render();

        } else {

            if (this.rotation === 0){
                this.rotation = 4;
            }
            this.rotation --;
            this.checkGhost();
            this.render();

        }

    }




    // Function to start the loop. Should only be called once.
    start() {
        if (!this.started) {
            this.started = true;
            document.addEventListener('keydown', this.keyPressed.bind(this));
            this.reset();
        }
    }

    // Function to loop every frame of the mainLoop. If the checks (checkbottom and checkbottombox) fail, run reset()
    mainLoop() {
        this.y++;
        this.frame ++;

        if (this.checkBottom(this.y) && this.checkBox(this.x, this.y)){
            this.render();
        } else {
            this.y --;
            this.frame--;
            this.reset();

        }
    }

    // Function to select a new shape and reset the interval
    reset() {
        clearInterval(this.interval);

        if(this.run !== 0){
            this.push();
        }

        this.checkRows();

        if(this.frame < 1 && this.run !== 0){
            this.gameover();
        } else {

            this.frame = 0;
            this.run += 1;
            this.x = this.xDefault;
            this.y = this.yDefault;
            this.rotation = 0;  //Reset the rotation
            this.activeshape = this.shapes[Tetris.getRandomInt()];
            this.checkGhost();
            this.interval = setInterval(this.mainLoop.bind(this), this.frameRate);
        }

    }

    gameover() {
        this.started        = false;
        this.blocks         = [];
        this.frame          = 0;
        this.run            = 0;
    }

}

new Tetris();





