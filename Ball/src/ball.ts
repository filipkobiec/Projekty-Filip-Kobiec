import {Circle} from "./circle"
export class Ball extends Circle{
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
    resetToDefault(x:number, y:number, radius:number){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}