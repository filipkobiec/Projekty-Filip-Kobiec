import { GameLoop } from './game_loop';
import { GameCanvas } from './game_canvas';

export class App {
    boardWidth: number = 10;
    boardHeight: number = 20;
    constructor() {
        this.initialize()
    }

    initialize(){
        const gameCanvas = new GameCanvas('game', this.boardWidth, this.boardHeight);
        const gameLoop = new GameLoop(gameCanvas, this.boardWidth, this.boardHeight);
        document.addEventListener('keypress', e => move(e.code));
        function move(key: any){
            switch (key){
                case 'KeyD':
                    gameLoop.moveBlockRight(gameLoop.activeBlock)
                    break;
                case 'KeyA':
                    gameLoop.moveBlockLeft(gameLoop.activeBlock)
            }
        }
        gameLoop.start();
    }
}

