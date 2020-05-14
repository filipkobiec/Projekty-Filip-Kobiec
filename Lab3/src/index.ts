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
    }
}

class Ball extends Circle{
    speed_x: number = 0
    speed_y: number = 0
    factor: number = 5
    constructor(
        x: number,
        y: number,
        radius:number,
        htmlElement: HTMLDivElement
        ){
        super(x, y, radius, htmlElement)
        this.htmlElement.style.width = this.radius*2 + 'px'
        this.htmlElement.style.height = this.radius*2 + 'px'
    }   
}

class Board{
    
    ball: Ball = new Ball(40, 50, 20, document.querySelector('#ball'))

    animate(): void {
        this.ball.y += this.ball.speed_x
        this.ball.x +=this.ball.speed_y
        this.ball.htmlElement.style.top = this.ball.y + 'px'
        this.ball.htmlElement.style.left = this.ball.x + 'px'
    }
}


const board = new Board()
update()

function onDeviceOrientationChange(e: any): void 
{
    board.ball.speed_y = e.alpha * board.ball.factor
    board.ball.speed_x = e.beta * board.ball.factor
}
function update(): void {
    board.animate(); 
    window.requestAnimationFrame(update); 
}

window.addEventListener('deviceorientation', onDeviceOrientationChange)





