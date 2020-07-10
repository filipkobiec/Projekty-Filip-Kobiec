import { Cell } from "../objects/cell";
export class  GameCanvas{
    readonly ctx: CanvasRenderingContext2D;
    colors: string[];
    canvasWidth: number;
    canvasHeight: number;

    constructor(containerId: string, width: number, height: number){
        this.ctx = this.initialize(containerId, width, height);
        this.colors = ['blue', 'orange', 'red', 'purple', 'green'] 
    }

    initialize(containerId: string, width: number, height: number): CanvasRenderingContext2D {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = width;
        this.canvasWidth = width
        canvas.height = height;
        this.canvasHeight = height;
        canvas.id = 'board'
        const container = document.querySelector('#' + containerId);
        container.appendChild(canvas);
        return canvas.getContext('2d');
    }
    // magic numbers
    drawBoard(boardMatrix: Cell[][]){
        for (let i = 0; i < boardMatrix.length; i++){
            for (let j = 0; j < boardMatrix[i].length; j++){
                this.ctx.fillStyle = boardMatrix[i][j].color;
                this.ctx.fillRect(10 + 29*j, 10 + 29* i, 25, 25)
            }
        }
    }

    drawNextBrick(brickMatrix: string[][]){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (let i = 0; i < brickMatrix.length; i++){
            for (let j = 0; j < brickMatrix[0].length; j++){
                this.ctx.fillStyle = brickMatrix[i][j];
                this.ctx.fillRect(10 + 25*j, 10 + 25* i, 19, 19)
            }
        }
    }

}