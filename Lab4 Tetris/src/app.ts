import { GameLoop } from './game/gameLoop';
import { GameCanvas } from './game/gameCanvas';

export class App {
    boardWidth: number = 10;
    boardHeight: number = 20;

    initialize(){
        const gameCanvas = new GameCanvas('game', 400, 800);
        const nextBrickCanvas = new GameCanvas('nextBrick', 100, 100)
        const gameLoop = new GameLoop(gameCanvas, nextBrickCanvas, this.boardWidth, this.boardHeight);
        document.addEventListener('keypress', e => this.onKeyPress(e.code, gameLoop));
        document.getElementById('button').addEventListener("click", e => this.onStart(gameLoop))
    }

    onStart(gameLoop: GameLoop){
        gameLoop.start();
    }

    onKeyPress(key: any, gameLoop: GameLoop){
        switch (key){
            case 'KeyD':
                if (!gameLoop.collisionController.checkCollisionOnSides(true, gameLoop.activeBlock, gameLoop.boardMatrix))
                gameLoop.movementController.moveBlockRight(gameLoop.activeBlock)
                break;
            case 'KeyA':
                if (!gameLoop.collisionController.checkCollisionOnSides(false, gameLoop.activeBlock, gameLoop.boardMatrix))
                gameLoop.movementController.moveBlockLeft(gameLoop.activeBlock)
                break;
            case 'KeyW':
                gameLoop.activeBlock.switchVariant();
        }
    }
}

