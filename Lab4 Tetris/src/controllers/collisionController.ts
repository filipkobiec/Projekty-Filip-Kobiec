import {Brick} from "../objects/brick"
import {Cell} from "../objects/cell"
export class CollisionController{
    
    checkBottomCollision(activeBlock: Brick, boardMatrix: Cell[][] ) {    
        const lengthOfFigure = activeBlock.shape.length;
    
        for (let i = 0; i < lengthOfFigure; i++) {
            for (let j = 0; j < lengthOfFigure; j++) {
                const occupied = activeBlock.shape[i][j] !== 'white';
                if (occupied) {
                    const notInBoardRange = i + activeBlock.position.y > 19
                    if (notInBoardRange) {
                        return true;
                    }
                    const collisionWithBrick = boardMatrix[i + activeBlock.position.y][j + activeBlock.position.x].color !== 'white';
                    if (collisionWithBrick) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    // nie poczebne
    checkCollisionOnBottom(activeBlock: Brick, boardMatrix: Cell[][]) {    
        activeBlock.position.y++;
        const status = this.checkBottomCollision(activeBlock, boardMatrix);
        activeBlock.position.y--;
        return status;
    }

    checkCollisionOnSides(isRight: boolean, activeBlock: Brick, boardMatrix: Cell[][]) {    
        isRight === true ? activeBlock.position.x++ : activeBlock.position.x--;
        const status = this.checkSideCollision(activeBlock, boardMatrix);
        isRight === true ? activeBlock.position.x-- : activeBlock.position.x++;
        return status;
    }

    checkSideCollision(activeBlock: Brick, boardMatrix: Cell[][]) {    
        const lengthOfFigure = activeBlock.shape.length;
    
        for (let i = 0; i < lengthOfFigure; i++) {
            for (let j = 0; j < lengthOfFigure; j++) {
                const occupied = activeBlock.shape[i][j] !== 'white';
                if (occupied) {
                    const notInBoardRange = j + activeBlock.position.x < 0 || 9 < j + activeBlock.position.x
                    if (notInBoardRange) {
                        return true;
                    }
                    const collisionWithBrick = boardMatrix[i + activeBlock.position.y][j + activeBlock.position.x].color !== 'white';
                    if (collisionWithBrick) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}