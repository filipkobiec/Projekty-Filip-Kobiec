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
        this.chooseShape(this.type);
    }
    setPosition(position: Position): void{
        this.position = position
    };
    getPosition(): Position{
       return this.position;
    };

    chooseShape(type: BlockType): void{
        const baseColor = 'white'
        switch (type){
            case BlockType.square:
                this.shape = [
                    [this.color, this.color],
                    [this.color, this.color]
                ]
                break;
            case BlockType.line:
                this.shape = [
                    [baseColor, baseColor, baseColor],
                    [this.color, this.color, this.color],
                    [baseColor, baseColor, baseColor],
                ]
        }
    }
}