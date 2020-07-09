import {Ball} from "./ball"
import {Circle} from "./circle"
export class Board{
    ball: Ball;
    hole: Circle;
    startX = 40;
    startY = 50;
    startR = 20
    constructor(){
        this.ball = new Ball(this.startX, this.startY, this.startR, document.querySelector('#ball'))
        this.hole = new Circle(100, 100, 40, document.querySelector('#hole'))
        window.addEventListener('deviceorientation', e => this.onDeviceOrientationChange(e))
    }

    animate(): void {
        this.ball.x += this.ball.speed_x
        this.ball.y +=this.ball.speed_y
        this.ball.htmlElement.style.top = this.ball.y + 'px'
        this.ball.htmlElement.style.left = this.ball.x + 'px'
    }

    update(): void {
        this.animate();
        this.checkCollision(); 
        window.requestAnimationFrame(() => this.update()); 
    }

    onDeviceOrientationChange(e: any): void 
    {
        this.ball.speed_x = e.gamma * this.ball.factor
        this.ball.speed_y = e.beta * this.ball.factor
    }

    checkCollision() {
        if (this.ball.x>this.hole.x-this.hole.radius && this.ball.x<this.hole.x+this.hole.radius){
            if (this.ball.y>this.hole.y-this.hole.radius && this.ball.y<this.hole.y+this.hole.radius){
                alert("You loose");
                this.ball.resetToDefault(this.startX, this.startY, this.startR);

            }
        }
    }
}
