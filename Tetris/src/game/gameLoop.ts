import {GameCanvas} from "./gameCanvas"
import {Brick} from "../objects/brick"
import {MovementController} from "../controllers/movementController"
import {Cell} from "../objects/cell"
import {CollisionController} from "../controllers/collisionController"
import { GameState } from "../objects/gameState"
export class GameLoop{
    readonly blockSpeed: number;
    gameCanvas: GameCanvas;
    nextBrickCanvas: GameCanvas;
    boardMatrix: Cell[][];
    boardWidth: number;
    boardHeight: number;
    activeBlock: Brick;
    nextBlock: Brick
    collisionController: CollisionController
    movementController: MovementController;
    gameState: GameState = GameState.stop;
    points: number = 0;


    constructor(gameCanvas: GameCanvas, nextBrickCanvas: GameCanvas, width: number, height: number){
        this.gameCanvas = gameCanvas;
        this.nextBrickCanvas = nextBrickCanvas;
        this.boardWidth = width;
        this.boardHeight = height;
        this.collisionController = new CollisionController;
        this.movementController = new MovementController;
    }
    setGameState(newState: GameState){
        this.gameState = newState;
    }

    start(): void{
        this.boardMatrix = this.createBoardMatrix(this.boardWidth, this.boardHeight);
        this.activeBlock = this.getRandomBlock();
        this.nextBlock = this.getRandomBlock();
        this.gameCanvas.drawBoard(this.boardMatrix);
        this.nextBrickCanvas.drawNextBrick(this.nextBlock.shape);
        setInterval(() => this.loop(), 200);
        setInterval(() => this.moveAndRotate(), 50)
    }

    loop(): void{
        if (this.collisionController.checkCollisionOnBottom(this.activeBlock, this.boardMatrix)){
            this.saveBrickToMatrix();
            this.updateRows();
            this.gameCanvas.drawBoard(this.boardMatrix);
            this.activeBlock = this.nextBlock;
            this.nextBlock = this.getRandomBlock();
            this.nextBrickCanvas.drawNextBrick(this.nextBlock.shape)
        }    
        else{
            this.saveBrickBeforeClear()
            this.movementController.moveBlockDown(this.activeBlock);
            this.gameCanvas.drawBoard(this.boardMatrix);
            this.clearBoardMatrix()
        }
    }

    moveAndRotate(): void{
        this.saveBrickBeforeClear();
        this.gameCanvas.drawBoard(this.boardMatrix);
        this.clearBoardMatrix();
    }
    
    // color na const
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

    checkRow(cell: Cell){
        return cell.color !== 'white'
    }

    updateRows(){
        // funkcja dla for for
        for (let i = 0; i < this.boardMatrix.length; i++){
            if (this.boardMatrix[i].every(this.checkRow)){
                this.boardMatrix.splice(i, 1)
                this.points += 10;
                document.querySelector('#points').innerHTML = `Points: ${this.points}`
                const tempArr: Cell[] = [];
                for (let j = 0; j < 10; j++)
                    tempArr.push(new Cell)
                this.boardMatrix.unshift(tempArr);
            }
        }
    }
}
