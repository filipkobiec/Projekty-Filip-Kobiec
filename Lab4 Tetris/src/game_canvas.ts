import {Brick} from "./brick"
export class  GameCanvas{
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