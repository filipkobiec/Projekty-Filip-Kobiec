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
        if (blockY === 18 || this.boardMatrix[blockY + 2][blockX] !== 'white'){
            this.boardMatrix[blockY][blockX] = this.activeBlock.color;
            for (let i = 0; i < this.activeBlock.shape.length; i++){
                for (let j = 0; j < this.activeBlock.shape[0].length; j++){
                    this.boardMatrix[blockY + i][blockX+ j] = this.activeBlock.color
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
}
