export class App {
    boardWidth: number = 400;
    boardHeight: number = 800;
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
        canvas.width = width;
        canvas.height = height;
        canvas.id = 'board'
        const container = document.querySelector('#' + containerId);
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');
    }

    drawBlock(blockType: BlockType, BlockPosition: BlockPosition, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#ff0050';
        ctx.fillRect(50, 50, 100, 100);
    }

    drawBoard(boardMatrix: number[][]){

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
    setPosition(position: Position): void;
    getPosition(position: Position): Position;
};

export interface BlockPosition{
    x: number;
    y: number;
}

enum BlockType{
    square,
    line
}