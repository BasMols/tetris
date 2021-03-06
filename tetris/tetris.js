class Tetris {
    constructor() {
        this.blockSize      = 40;                           // Blok size in pixels
        this.canvaswidth    = 10 * this.blockSize;          // X grid size * pixel per block
        this.canvasheight   = 20 * this.blockSize;          // Y grid size * pixel per block
        this.run            = 0;                            // Run counter for score
        this.frame          = 0;                            // Frame counter for this.gameover()
        this.x              = 0;                            // X changing position
        this.y              = 0;                            // Y changing position
        this.ghostY         = 0;                            // Y ghost
        this.ghostcolor     = 'darkgrey';                   // Ghost color
        this.ghostframe     = 0;                            // frame counter ghost will skip
        this.xDefault       = 4;                            // X Startpositie
        this.yDefault       = -2;                           // Y Startpositie
        this.rotation       = 0;                            // Current rotation
        this.started        = false;                        // Spel nog niet gestart
        this.frameRate      = 500;                          // Aantal frames per seconde
        this.blocks         = [];                           // This array will contain objects off all existing (non moving) blocks.
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
        ];                        // Array with all shapes and rotations

        document.addEventListener("DOMContentLoaded", () => {
            this.createCanvas();
            this.canvas.addEventListener('click', this.start.bind(this));
        });
    }

// Functions
    //Function to generate a int between 0 and 6
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

        this.hold1 = this.shapes[Tetris.getRandomInt()];
        this.hold = document.createElement('hold');
        this.hold.setAttribute('id', 'hold');
        this.hold.setAttribute('width', '100');
        this.hold.setAttribute('height', '100');
        document.body.appendChild(this.hold);

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

    // Function to push the active shape to the blocks array when they lock
    push() {
        this.blocks.push(
            {x: this.x + this.activeshape[this.rotation][0].x, y: this.y + this.activeshape[this.rotation][0].y, color: this.activeshape.color},
            {x: this.x + this.activeshape[this.rotation][1].x, y: this.y + this.activeshape[this.rotation][1].y, color: this.activeshape.color},
            {x: this.x + this.activeshape[this.rotation][2].x, y: this.y + this.activeshape[this.rotation][2].y, color: this.activeshape.color},
            {x: this.x + this.activeshape[this.rotation][3].x, y: this.y + this.activeshape[this.rotation][3].y, color: this.activeshape.color}
        );
    }

    // Function to render the background / the active blocks / the existing blocks / and the ghost using the drawBlock() Function
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

    //Function to remove a full rown
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


// Checks
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

    //Functions to check for any full rows
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


// Moves
    // Function to run when any key is pressed
    keyPressed() {
        if (this.started){

            switch (event.key) {
                case "ArrowDown":
                    this.mainLoop(); //Call mainloop because funtion is the same
                    break;
                case "ArrowUp":
                    this.rotate('rotateright');
                    break;
                case "ArrowLeft":
                    this.arrowKeys(-1);
                    break;
                case "ArrowRight":
                    this.arrowKeys(1);
                    break;
                case " ": //space
                    this.hardLock();
                    break;
                case "Escape":
                    // this.pauze();
                    break;
                case "z":
                    this.rotate('rotateleft');
                    break;
                case "c":
                    // this.hold();
                    break;
                case "r":
                    // this.gameover();
                    // this.start();
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }

        }

    }

    //function to move the blocks;
    arrowKeys(dir) {

        this.x += dir;
        if (this.checkSides() && this.checkBox(this.x, this.y)) {
            this.checkGhost();
            this.render();
        } else {
            this.x -= dir;
        }

    }

    //Function to instantly lock the block down
    hardLock(){
        this.checkGhost();
        this.y = this.ghostY;
        this.frame += this.ghostframe;
        this.render();
        this.reset();
    }

    //Function to rotate the blocks
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

    //Function to hold a piece
    hold() {
        this.hold2 = this.activeshape;
        this.activeshape = this.hold1;
        this.hold1 = this.hold2;

        this.frame = 0;
        this.run += 1;
        this.x = this.xDefault;
        this.y = this.yDefault;
        this.rotation = 0;  //Reset the rotation
        this.checkGhost();
    }


// Main gameplay loop
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
            this.activeshape = this.hold1;
            this.checkGhost();

            this.hold1 = this.shapes[Tetris.getRandomInt()];
            this.holdbox = document.getElementById('hold');
            this.holdbox.innerHTML = this.hold1.color;

            this.interval = setInterval(this.mainLoop.bind(this), this.frameRate);


        }

    }

    //Function to run when the game ends
    gameover() {
        clearInterval(this.interval);
        this.started        = false;
        this.blocks         = [];
        this.frame          = 0;
        this.run            = 0;
    }

}

new Tetris();





