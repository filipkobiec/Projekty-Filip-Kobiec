import './main.scss';

let scene

class Circle{
    x: number
    y:  number
    radius: number
    htmlElement: HTMLDivElement

    constructor(x: number, y: number, radius: number, htmlElement: HTMLDivElement){
        this.x = x
        this.y = y
        this.radius = radius
        this.htmlElement = htmlElement
        this.htmlElement.style.width = this.radius*2 + 'px'
        this.htmlElement.style.height = this.radius*2 + 'px'
        this.htmlElement.style.top = this.y + 'px'
        this.htmlElement.style.left = this.x + 'px'

    }
}


class Ball extends Circle{
    speed_x: number = 0
    speed_y: number = 0
    factor: number = 0.5
    constructor(
        x: number,
        y: number,
        radius:number,
        htmlElement: HTMLDivElement
        ){
        super(x, y, radius, htmlElement)
    }   
}

class Board{
    
    ball: Ball = new Ball(40, 50, 20, document.querySelector('#ball'))
    hole: Circle = new Circle(100, 100, 40, document.querySelector('#hole'))

    animate(): void {
        this.ball.x += this.ball.speed_x
        this.ball.y +=this.ball.speed_y
        this.ball.htmlElement.style.top = this.ball.y + 'px'
        this.ball.htmlElement.style.left = this.ball.x + 'px'
    }

    checkCollision() {
        if (this.ball.x>this.hole.x-this.hole.radius && this.ball.x<this.hole.x+this.hole.radius){
            if (this.ball.y>this.hole.y-this.hole.radius && this.ball.y<this.hole.y+this.hole.radius){
                this.ball.htmlElement.style.width = 0 + 'px'
                
            }
        }
    }
}


const board = new Board()
update()

function onDeviceOrientationChange(e: any): void 
{
    board.ball.speed_x = e.gamma * board.ball.factor
    board.ball.speed_y = e.beta * board.ball.factor
}
function update(): void {
    board.animate();
    board.checkCollision(); 
    window.requestAnimationFrame(update); 
}

window.addEventListener('deviceorientation', onDeviceOrientationChange)





