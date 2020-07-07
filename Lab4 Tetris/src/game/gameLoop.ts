import {GameCanvas} from "./gameCanvas"
import {Brick} from "../objects/brick"
import {Position} from "../objects/position"
import {Cell} from "../objects/cell"
import {CollisionController} from "../controllers/collisionController"
export class GameLoop{
    readonly blockSpeed: number;
    gameCanvas: GameCanvas;
    boardMatrix: Cell[][];
    boardWidth: number;
    boardHeight: number;
    activeBlock: Brick;
    collisionController: CollisionController

    constructor(gameCanvas: GameCanvas, width: number, height: number){
        this.gameCanvas = gameCanvas;
        this.boardWidth = width;
        this.boardHeight = height;
        this.collisionController = new CollisionController;
    }

    start(): void{
        this.boardMatrix = this.createBoardMatrix(this.boardWidth, this.boardHeight);
        this.activeBlock = this.getRandomBlock();
        this.gameCanvas.drawBoard(this.boardMatrix);
        setInterval(() => this.loop(), 100);
        setInterval(() => this.moveAndRotate(), 50)

    }

    loop(): void{
        if (this.collisionController.checkCollisionOnBottom(this.activeBlock, this.boardMatrix)){
            this.saveBrickToMatrix();
            this.gameCanvas.drawBoard(this.boardMatrix);
            this.activeBlock = this.getRandomBlock();
        }    
        else{
            this.saveBrickBeforeClear()
            this.moveBlockDown(this.activeBlock);
            this.gameCanvas.drawBoard(this.boardMatrix);
            this.clearBoardMatrix()
        }
    }

    moveAndRotate(): void{
        this.saveBrickBeforeClear();
        this.gameCanvas.drawBoard(this.boardMatrix);
        this.clearBoardMatrix();
    }
    
    saveBrickToMatrix(): void{
        for (let i = 0; i < this.activeBlock.shape.length; i++){
            for (let j = 0; j < this.activeBlock.shape[0].length; j++){
                if (this.activeBlock.posY + i < 20 && this.activeBlock.posX + j < 10 && this.activeBlock.shape[i][j] !== 'white'){
                    this.boardMatrix[this.activeBlock.posY + i][this.activeBlock.posX+ j].color = this.activeBlock.shape[i][j]
                    this.boardMatrix[this.activeBlock.posY + i][this.activeBlock.posX+ j].isSet = true
                }
            }
        }
    }

    saveBrickBeforeClear(): void{
        for (let i = 0; i < this.activeBlock.shape.length; i++){
            for (let j = 0; j < this.activeBlock.shape[0].length; j++){
                if (this.activeBlock.shape[i][j] !== 'white')
                    this.boardMatrix[this.activeBlock.posY + i][this.activeBlock.posX + j].color = this.activeBlock.shape[i][j];
            }
        }
    }

    createBoardMatrix(width: number, height: number): Cell[][]{
        const result: Cell[][] = [];
        for (let i = 0; i < height; i++){
            result[i] = [];
            for (let j = 0; j < width; j++){
                result[i][j] = new Cell();
            }
        }
        return result;
    }

    clearBoardMatrix(){
        for (let i = 0; i < this.boardMatrix.length; i++){
            for (let j = 0; j < this.boardMatrix[0].length; j++){
                if (!this.boardMatrix[i][j].isSet)
                    this.boardMatrix[i][j].color = 'white'
            }
        }
    }

    getRandomBlock(){
        const randomColor = this.gameCanvas.colors[Math.floor(Math.random() * this.gameCanvas.colors.length)];
        const randomBrickNum = this.getRandomNumberBetween(0,6)
        return  new Brick(randomBrickNum , randomColor);
    }

    getRandomNumberBetween(min: number,max: number): number{
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    move(key: any){
        switch (key){
            case 'KeyD':
                if (!this.collisionController.checkCollisionOnSides(true, this.activeBlock, this.boardMatrix))
                this.moveBlockRight(this.activeBlock)
                break;
            case 'KeyA':
                if (!this.collisionController.checkCollisionOnSides(false, this.activeBlock, this.boardMatrix))
                this.moveBlockLeft(this.activeBlock)
                break;
            case 'KeyW':
                this.activeBlock.switchVariant();
        }
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
