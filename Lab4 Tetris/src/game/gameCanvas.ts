import { Cell } from "../objects/cell";
export class  GameCanvas{
    readonly ctx: CanvasRenderingContext2D;
    colors: string[];

    constructor(containerId: string, width: number, height: number){
        this.ctx = this.initialize(containerId, width, height);
        this.colors = ['blue', 'orange', 'red', 'purple', 'green'] 
    }

    initialize(containerId: string, width: number, height: number): CanvasRenderingContext2D {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.id = 'board'
        const container = document.querySelector('#' + containerId);
        container.appendChild(canvas);
        return canvas.getContext('2d');
    }

    drawBoard(boardMatrix: Cell[][]){
        for (let i = 0; i < boardMatrix.length; i++){
            for (let j = 0; j < boardMatrix[i].length; j++){
                this.ctx.fillStyle = boardMatrix[i][j].color;
                this.ctx.fillRect(10 + 39*j, 10 + 39*i, 29, 29)
            }
        }
    }

    drawNextBrick(brickMatrix: string[][]){
        for (let i = 0; i < brickMatrix.length; i++){
            for (let j = 0; j < brickMatrix[0].length; j++){
                this.ctx.fillStyle = brickMatrix[i][j];
                this.ctx.fillRect(3 + 10*j, 3 + 10* i, 8, 8)
            }
        }
    }
}