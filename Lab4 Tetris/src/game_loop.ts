import {GameCanvas} from "./game_canvas"
import {Brick} from "./brick"
import {BlockType} from "./block_type"
import {Position} from "./position"
export class GameLoop{
    readonly blockSpeed: number;
    gameCanvas: GameCanvas;
    boardMatrix: string[][];
    tempBoard: string[][];
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
        this.tempBoard = [];
        const brickColor = this.activeBlock.color;
        for (let i = 0; i < this.boardMatrix.length; i++){
            this.tempBoard[i] = this.boardMatrix[i].slice()
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
                    if (this.activeBlock.shape[i][j] !== 'white')
                        this.tempBoard[blockY + i][blockX + j] = this.activeBlock.shape[i][j];
                }
            }
            this.moveBlockDown(this.activeBlock);
            this.gameCanvas.drawBoard(this.tempBoard);
        }
    }

    moveAndRotate(): void{
        const blockX = this.activeBlock.position.x;
        const blockY = this.activeBlock.position.y;
        this.tempBoard = [];
        for (let i = 0; i < this.boardMatrix.length; i++){
            this.tempBoard[i] = this.boardMatrix[i].slice()
        }
        for (let i = 0; i < this.activeBlock.shape.length; i++){
            for (let j = 0; j < this.activeBlock.shape[0].length; j++){
                if (this.activeBlock.shape[i][j] !== 'white')
                    this.tempBoard[blockY + i][blockX + j] = this.activeBlock.shape[i][j];
            }
        }
        this.gameCanvas.drawBoard(this.tempBoard)
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

    checkCollisionOnSides(isRight: boolean, activeBlock: Brick, boardMatrix: string[][]) {    
        isRight === true ? activeBlock.position.x++ : activeBlock.position.x--;
        const status = this.checkSideCollision(activeBlock, boardMatrix);
        isRight === true ? activeBlock.position.x-- : activeBlock.position.x++;
        return status;
    }

    checkSideCollision(activeBlock: Brick, boardMatrix: string[][]) {    
        const lengthOfFigure = activeBlock.shape.length;
    
        for (let i = 0; i < lengthOfFigure; i++) {
            for (let j = 0; j < lengthOfFigure; j++) {
                const occupied = activeBlock.shape[i][j] !== 'white';
                if (occupied) {
                    const notInBoardRange = j + activeBlock.position.x < 0 || 9 < j + activeBlock.position.x
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
    
}
