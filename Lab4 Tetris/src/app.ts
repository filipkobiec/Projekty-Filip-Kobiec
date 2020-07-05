export class App {
    boardWidth: number = 10;
    boardHeight: number = 20;
    constructor() {
        this.initialize()
    }

    initialize(){
        const gameCanvas = new GameCanvas('game', this.boardWidth, this.boardHeight)
    }
}

export class GameCanvas{
    constructor(containerId: string, width: number, height: number){
        this.initialize(containerId, width, height);
    }

    initialize(containerId: string, width: number, height: number) {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 800;
        canvas.id = 'board'
        const container = document.querySelector('#' + containerId);
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let boardMatrix = this.createBoardMatrix(width, height);
        this.drawBoard(boardMatrix, ctx);

    }

    drawBlock(blockType: BlockType, BlockPosition: BlockPosition, ctx: CanvasRenderingContext2D, color: string): void {
        ctx.fillStyle = color;
        ctx.fillRect(BlockPosition.x, BlockPosition.y, 30, 30);
    }

    drawBoard(boardMatrix: string[][], ctx: CanvasRenderingContext2D){
        for (let i = 0; i < boardMatrix.length; i++){
            for (let j = 0; j < boardMatrix[i].length; j++){
                ctx.fillStyle = boardMatrix[i][j];
                ctx.fillRect(10 + 39*j, 10 + 39*i, 29, 29)
            }
        }
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
}

export class GameLoop{
    readonly blockSpeed: number;
    gameCanvas: GameCanvas;
    boardMatrix: string[][];
    boardWidth: number;
    boardHeight: number;
    activeBlock: Block;

    constructor(gameCanvas: GameCanvas, width: number, height: number){
        this.gameCanvas = gameCanvas;
        this.boardWidth = width;
        this.boardHeight = height;
    }

    start(): void{

    }
}

export interface Block{
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

export class Brick implements Block{
    readonly type: BlockType;
    readonly color: string;
    position: BlockPosition;
    isActive: boolean;
    width: number;
    height: number;
    shape: number[][];
    constructor(type: BlockType, color: string){
        this.type = type;
        this.color = color;
    }
    setPosition(position: BlockPosition): void{
        this.position = position
    };
    getPosition(): BlockPosition{
       return this.position;
    };
}

export interface BlockPosition{
    x: number;
    y: number;
}

enum BlockType{
    square,
    line
}