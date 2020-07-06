import {GameCanvas} from "./game_canvas"
import {Brick} from "./brick"
import {BlockType} from "./block_type"
import {Position} from "./position"
export class GameLoop{
    readonly blockSpeed: number;
    gameCanvas: GameCanvas;
    boardMatrix: string[][];
    boardWidth: number;
    boardHeight: number;
    activeBlock: Brick;

    constructor(gameCanvas: GameCanvas, width: number, height: number){
        this.gameCanvas = gameCanvas;
        this.boardWidth = width;
        this.boardHeight = height;
    }

    start(): void{
        this.boardMatrix = this.createBoardMatrix(this.boardWidth, this.boardHeight);
        this.activeBlock = this.getRandomBlock();
        this.gameCanvas.drawBoard(this.boardMatrix);
        this.loop();

    }

    loop(): void{
        const blockX = this.activeBlock.position.x;
        const blockY = this.activeBlock.position.y;
        const tempBoard: string[][] = [];
        const brickColor = this.activeBlock.color;
        for (let i = 0; i < this.boardMatrix.length; i++){
            tempBoard[i] = this.boardMatrix[i].slice()
        }
        if (this.checkCollisionOnBottom(this.activeBlock, this.boardMatrix)){
            for (let i = 0; i < this.activeBlock.shape.length; i++){
                for (let j = 0; j < this.activeBlock.shape[0].length; j++){
                    if (blockY + i < 20 && blockX + j < 10 && this.activeBlock.shape[i][j] !== 'white')
                    this.boardMatrix[blockY + i][blockX+ j] = this.activeBlock.shape[i][j]
                }
            }
            this.gameCanvas.drawBoard(this.boardMatrix);
            this.activeBlock = this.getRandomBlock();
        }    
        else{
            for (let i = 0; i < this.activeBlock.shape.length; i++){
                for (let j = 0; j < this.activeBlock.shape[0].length; j++){
                    tempBoard[blockY + i][blockX + j] = this.activeBlock.shape[i][j];
                }
            }
            this.moveBlockDown(this.activeBlock);
            this.gameCanvas.drawBoard(tempBoard);
        }

        setTimeout(() => {
            requestAnimationFrame(() => this.loop())
        }, 500);

    }
    
    createBoardMatrix(width: number, height: number): string[][]{
        const result: string[][] = [];
        for (let i = 0; i < height; i++){
            result[i] = [];
            for (let j = 0; j < width; j++){
                result[i][j] = "white";
            }
        }
        return result;
    }

    getRandomBlock(){
        const randomColor = this.gameCanvas.colors[Math.floor(Math.random() * this.gameCanvas.colors.length)];
        const randomBrickNum = this.getRandomNumberBetween(0,6)
        return  new Brick(randomBrickNum , randomColor);
    }

    getRandomNumberBetween(min: number,max: number){
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    

    moveBlockDown(block: Brick){
        const position: Position = block.getPosition();
        position.y += 1;
        block.setPosition(position)
    }

    
    moveBlockRight(block: Brick){
        const position: Position = block.getPosition();
        position.x += 1;
        block.setPosition(position)
    }

    moveBlockLeft(block: Brick){
        const position: Position = block.getPosition();
        position.x -= 1;
        block.setPosition(position)
    }

    checkBottomCollision(activeBlock: Brick, boardMatrix: string[][] ) {    
        const lengthOfFigure = activeBlock.shape.length;
    
        for (let i = 0; i < lengthOfFigure; i++) {
            for (let j = 0; j < lengthOfFigure; j++) {
                const occupied = activeBlock.shape[i][j] !== 'white';
                if (occupied) {
                    const notInBoardRange = i + activeBlock.position.y > 19
                    if (notInBoardRange) {
                        return true;
                    }
                    const collisionWithBrick = boardMatrix[i + activeBlock.position.y][j + activeBlock.position.x] !== 'white';
                    if (collisionWithBrick) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    checkCollisionOnBottom(activeBlock: Brick, boardMatrix: string[][]) {    
        activeBlock.position.y++;
        const status = this.checkBottomCollision(activeBlock, boardMatrix);
        activeBlock.position.y--;
        return status;
    }
}
