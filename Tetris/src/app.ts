import { GameLoop } from './game/gameLoop';
import { GameCanvas } from './game/gameCanvas';
import { GameState } from './objects/gameState';

export class App {
    boardWidth: number = 10;
    boardHeight: number = 20;

    initialize(){
        const gameCanvas = new GameCanvas('game', 310, 600);
        const nextBrickCanvas = new GameCanvas('game', 100, 100)
        const gameLoop = new GameLoop(gameCanvas, nextBrickCanvas, this.boardWidth, this.boardHeight);
        document.addEventListener('keypress', e => this.onKeyPress(e.code, gameLoop));
        const startButton = document.getElementById('button');
        startButton.addEventListener("click", () => this.onStart(startButton , gameLoop))
    }

    onStart(button: HTMLElement, gameLoop: GameLoop){
        switch (gameLoop.gameState){
            case GameState.stop:
                gameLoop.start();
                button.innerHTML = "Restart"
                gameLoop.setGameState(GameState.game)
            case GameState.game:
        }
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

