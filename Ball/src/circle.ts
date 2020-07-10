export class Circle{
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