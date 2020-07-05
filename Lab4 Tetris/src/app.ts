namespace game{
    
}
export class App {
    boardWidth: number = 10;
    boardHeight: number = 20;
    constructor() {
        this.initialize()
    }

    initialize(){
        const gameCanvas = new GameCanvas('game', this.boardWidth, this.boardHeight);
        const gameLoop = new GameLoop(gameCanvas, this.boardWidth, this.boardHeight);
        gameLoop.start();
    }
}

    class Position{
    x = 0;
    y = 0;
}

enum BlockType{
    square,
    line
    }
    
class Brick {
    readonly type: BlockType;
    readonly color: string;
    position: Position;
    isActive: boolean;
    width: number;
    height: number;
    shape: string[][];
    constructor(type: BlockType, color: string){
        this.type = type;
        this.color = color;
        this.position = new Position();
        if (type === BlockType.square){
            this.shape = [
                [color, color],
                [color, color]
            ]
        }
    }
    setPosition(position: Position): void{
        this.position = position
    };
    getPosition(): Position{
       return this.position;
    };
}

    class GameCanvas{
    readonly ctx: CanvasRenderingContext2D;

    constructor(containerId: string, width: number, height: number){
        this.ctx = this.initialize(containerId, width, height);
    }

    initialize(containerId: string, width: number, height: number): CanvasRenderingContext2D {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 800;
        canvas.id = 'board'
        const container = document.querySelector('#' + containerId);
        container.appendChild(canvas);
        return canvas.getContext('2d');
    }

    drawBoard(boardMatrix: string[][]){
        for (let i = 0; i < boardMatrix.length; i++){
            for (let j = 0; j < boardMatrix[i].length; j++){
                this.ctx.fillStyle = boardMatrix[i][j];
                this.ctx.fillRect(10 + 39*j, 10 + 39*i, 29, 29)
            }
        }
    }

    updateBoard(boardMatrix: string[][], ctx: CanvasRenderingContext2D, activeBlock: Brick){
        const tempBoard: string[][] = [];
        for (let i = 0; i < boardMatrix.length; i++)
            tempBoard[i] = boardMatrix[i].slice()
            const blockX = activeBlock.position.x;
            const blockY = activeBlock.position.y;
            for (let i = 0; i < activeBlock.shape.length; i++){
                for (let j = 0; j < activeBlock.shape[0].length; j++){
                    tempBoard[blockY + i][blockX + j] = activeBlock.color
                }
            }
        this.drawBoard(tempBoard)
    }
}

    class GameLoop{
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
            this.moveBlock(this.activeBlock);   
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

    moveBlock(block: Brick){
        const position: Position = block.getPosition();
        position.y += 1;
        block.setPosition(position)
    }
}

