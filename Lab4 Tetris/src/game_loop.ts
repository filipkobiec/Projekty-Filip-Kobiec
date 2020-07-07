import {GameCanvas} from "./game_canvas"
import {Brick} from "./brick"
import {BlockType} from "./block_type"
import {Position} from "./position"
import {Cell} from "./cell"
export class GameLoop{
    readonly blockSpeed: number;
    gameCanvas: GameCanvas;
    boardMatrix: Cell[][];
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
        setInterval(() => this.loop(), 100);
        setInterval(() => this.moveAndRotate(), 50)

    }

    loop(): void{
        const blockX = this.activeBlock.position.x;
        const blockY = this.activeBlock.position.y;
        const brickColor = this.activeBlock.color;

        if (this.checkCollisionOnBottom(this.activeBlock, this.boardMatrix)){
            for (let i = 0; i < this.activeBlock.shape.length; i++){
                for (let j = 0; j < this.activeBlock.shape[0].length; j++){
                    if (blockY + i < 20 && blockX + j < 10 && this.activeBlock.shape[i][j] !== 'white'){
                        this.boardMatrix[blockY + i][blockX+ j].color = this.activeBlock.shape[i][j]
                        this.boardMatrix[blockY + i][blockX+ j].isSet = true
                    }
                }
            }
            this.gameCanvas.drawBoard(this.boardMatrix);
            this.activeBlock = this.getRandomBlock();
        }    
        else{
            for (let i = 0; i < this.activeBlock.shape.length; i++){
                for (let j = 0; j < this.activeBlock.shape[0].length; j++){
                    if (this.activeBlock.shape[i][j] !== 'white')
                        this.boardMatrix[blockY + i][blockX + j].color = this.activeBlock.shape[i][j];
                }
            }
            this.moveBlockDown(this.activeBlock);
            this.gameCanvas.drawBoard(this.boardMatrix);
            this.clearBoardMatrix()
        }
    }

    moveAndRotate(): void{
        const blockX = this.activeBlock.position.x;
        const blockY = this.activeBlock.position.y;
        for (let i = 0; i < this.activeBlock.shape.length; i++){
            for (let j = 0; j < this.activeBlock.shape[0].length; j++){
                if (this.activeBlock.shape[i][j] !== 'white')
                    this.boardMatrix[blockY + i][blockX + j].color = this.activeBlock.shape[i][j];
            }
        }
        this.gameCanvas.drawBoard(this.boardMatrix);
        this.clearBoardMatrix();
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
                if (!this.checkCollisionOnSides(true, this.activeBlock, this.boardMatrix))
                this.moveBlockRight(this.activeBlock)
                break;
            case 'KeyA':
                if (!this.checkCollisionOnSides(false, this.activeBlock, this.boardMatrix))
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

    checkBottomCollision(activeBlock: Brick, boardMatrix: Cell[][] ) {    
        const lengthOfFigure = activeBlock.shape.length;
    
        for (let i = 0; i < lengthOfFigure; i++) {
            for (let j = 0; j < lengthOfFigure; j++) {
                const occupied = activeBlock.shape[i][j] !== 'white';
                if (occupied) {
                    const notInBoardRange = i + activeBlock.position.y > 19
                    if (notInBoardRange) {
                        return true;
                    }
                    const collisionWithBrick = boardMatrix[i + activeBlock.position.y][j + activeBlock.position.x].color !== 'white';
                    if (collisionWithBrick) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    checkCollisionOnBottom(activeBlock: Brick, boardMatrix: Cell[][]) {    
        activeBlock.position.y++;
        const status = this.checkBottomCollision(activeBlock, boardMatrix);
        activeBlock.position.y--;
        return status;
    }

    checkCollisionOnSides(isRight: boolean, activeBlock: Brick, boardMatrix: Cell[][]) {    
        isRight === true ? activeBlock.position.x++ : activeBlock.position.x--;
        const status = this.checkSideCollision(activeBlock, boardMatrix);
        isRight === true ? activeBlock.position.x-- : activeBlock.position.x++;
        return status;
    }

    checkSideCollision(activeBlock: Brick, boardMatrix: Cell[][]) {    
        const lengthOfFigure = activeBlock.shape.length;
    
        for (let i = 0; i < lengthOfFigure; i++) {
            for (let j = 0; j < lengthOfFigure; j++) {
                const occupied = activeBlock.shape[i][j] !== 'white';
                if (occupied) {
                    const notInBoardRange = j + activeBlock.position.x < 0 || 9 < j + activeBlock.position.x
                    if (notInBoardRange) {
                        return true;
                    }
                    const collisionWithBrick = boardMatrix[i + activeBlock.position.y][j + activeBlock.position.x].color !== 'white';
                    if (collisionWithBrick) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
}
