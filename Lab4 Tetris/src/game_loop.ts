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
        this.gameCanvas.updateBoard(this.boardMatrix, this.gameCanvas.ctx, this.activeBlock);
        this.loop();

    }

    loop(): void{
        const blockX = this.activeBlock.position.x;
        const blockY = this.activeBlock.position.y;
        if (this.checkCollisionOnBottom(this.activeBlock, this.boardMatrix)){
            const brickColor = this.activeBlock.color;
            for (let i = 0; i < this.activeBlock.shape.length; i++){
                for (let j = 0; j < this.activeBlock.shape[0].length; j++){
                    this.boardMatrix[blockY + i][blockX+ j] = this.activeBlock.shape[i][j]
                }
            }
            this.activeBlock = this.getRandomBlock();
        }
        else{
            this.moveBlockDown(this.activeBlock);   
        }
        this.gameCanvas.updateBoard(this.boardMatrix, this.gameCanvas.ctx, this.activeBlock);
            setTimeout(() => {
                requestAnimationFrame(() => this.loop())
            }, 100);

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
        return  new Brick(BlockType.square, "orange");
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
