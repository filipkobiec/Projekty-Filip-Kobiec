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

    drawBlock(blockType: BlockType, blockPosition: BlockPosition, color: string): void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(blockPosition.x, blockPosition.y, 30, 30);
    }

    drawBoard(boardMatrix: string[][]){
        for (let i = 0; i < boardMatrix.length; i++){
            for (let j = 0; j < boardMatrix[i].length; j++){
                this.ctx.fillStyle = boardMatrix[i][j];
                this.ctx.fillRect(10 + 39*j, 10 + 39*i, 29, 29)
            }
        }
    }

    updateBoard(boardMatrix: string[][], ctx: CanvasRenderingContext2D, activeBlock: Block){
        const tempBoard = [...boardMatrix];
        tempBoard[activeBlock.position.y][activeBlock.position.x] = activeBlock.color;
        this.drawBoard(boardMatrix)
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
        if (this.activeBlock.position.y === 751){
            this.boardMatrix[19][0] = this.activeBlock.color;
            this.activeBlock = this.getRandomBlock();
        }
        this.moveBlock(this.activeBlock);
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

    interface Block{
    readonly type: BlockType;
    readonly color: string;
    position: BlockPosition;
    isActive: boolean;
    width: number;
    height: number;
    shape: number[][];
    setPosition(position: BlockPosition): void;
    getPosition(): BlockPosition;
};

    class Brick implements Block{
    readonly type: BlockType;
    readonly color: string;
    position: Position;
    isActive: boolean;
    width: number;
    height: number;
    shape: number[][];
    constructor(type: BlockType, color: string){
        this.type = type;
        this.color = color;
        this.position = new Position();
    }
    setPosition(position: Position): void{
        this.position = position
    };
    getPosition(): Position{
       return this.position;
    };
}

    interface BlockPosition{
    x: number;
    y: number;
}

    class Position implements BlockPosition{
    x = 0;
    y = 0;
}

enum BlockType{
    square,
    line
}