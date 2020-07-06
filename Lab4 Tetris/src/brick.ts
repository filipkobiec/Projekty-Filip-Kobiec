import {BlockType} from "./block_type"
import {Position} from "./position"
export class Brick {
    readonly type: BlockType;
    readonly color: string;
    position: Position;
    isActive: boolean;
    width: number;
    height: number;
    shape: string[][];
    constructor(type: BlockType, color: string){
        this.type = type;
        this.color = color;
        this.position = new Position();
        if (type === BlockType.square){
            this.shape = [
                [color, color],
                [color, color]
            ]
        }
    }
    setPosition(position: Position): void{
        this.position = position
    };
    getPosition(): Position{
       return this.position;
    };
}