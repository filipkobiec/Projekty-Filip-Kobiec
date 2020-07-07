import {BlockType} from "./block_type"
import {Position} from "./position"
export class Brick {
    readonly type: BlockType;
    readonly color: string;
    position: Position;
    width: number;
    height: number;
    rotation: number;
    variant: string[][][];
    shape: string[][];
    constructor(type: BlockType, color: string){
        this.type = type;
        this.color = color;
        this.position = new Position();
        this.chooseVariant(this.type);
        this.rotation = 0;
        this.shape = this.variant[this.rotation];
    }
    setPosition(position: Position): void{
        this.position = position
    };
    getPosition(): Position{
       return this.position;
    };

    chooseVariant(type: BlockType): void{
    const w = 'white';
    const c = this.color;
    switch (type){
        case BlockType.square:
            this.variant = [
                [
                    [c, c],
                    [c, c]
                ]
            ]
            break;
        case BlockType.line:
            this.variant = [
                [
                    [w, w, w, w],
                    [w, w, w, w],
                    [c, c, c, c],
                    [w, w, w, w]
                ],
                [
                    [w, c, w, w],
                    [w, c, w, w],
                    [w, c, w, w],
                    [w, c, w, w]
                ],
                [
                    [w, w, w, w],
                    [c, c, c, c],
                    [w, w, w, w],
                    [w, w, w, w]
                ],
                [
                    [w, w, c, w],
                    [w, w, c, w],
                    [w, w, c, w],
                    [w, w, c, w],
                ]
            ]
            break;
            case BlockType.l:
                this.variant = [
                    [
                        [w, w, w],
                        [c, c, c],
                        [c, w, w]
                    ],
                    [
                        [c, c, w],
                        [w, c, w],
                        [w, c, w] 
                    ],
                    [
                        [w, w, c],
                        [c, c, c],
                        [w, w, w]
                    ],
                    [
                        [w, c, w],
                        [w, c, w],
                        [w, c, c]
                    ]
                ]
                break;
                case BlockType.rl:
                    this.variant = [
                    [
                        [w, w, w],
                        [c, c, c],
                        [w, w, c]
                    ],
                    [
                        [w, c, w],
                        [w, c, w],
                        [c, c, w]
                    ],
                    [
                        [c, w, w],
                        [c, c, c],
                        [w, w, w]
                    ],
                    [
                        [w, c, c],
                        [w, c, w],
                        [w, c, w]
                    ]
                ]
                break;
                case BlockType.z:
                    this.variant = [
                        [
                            [w, w, w],
                            [c, c, w],
                            [w, c, c]
                        ],
                        [
                            [w, c, w],
                            [c, c, w],
                            [c, w, w]
                        ],
                        [
                            [c, c, w],
                            [w, c, c],
                            [w, w, w]
                        ],
                        [
                            [w, w, c],
                            [w, c, c],
                            [w, c, w]
                        ]
                    ]
                    break;
                    case BlockType.zr:
                        this.variant = [
                            [
                                [w, w, w],
                                [w, c, c],
                                [c, c, w]
                            ],
                            [
                                [c, w, w],
                                [c, c, w],
                                [w, c, w]
                            ],
                            [
                                [w, c, c],
                                [c, c, w],
                                [w, w, w]
                            ],
                            [
                                [w, c, w],
                                [w, c, c],
                                [w, w, c]
                            ]
                        ]
                        break;
                        case BlockType.t:
                            this.variant = [
                                [
                                    [w, w, w],
                                    [c, c, c],
                                    [w, c, w]
                                ],
                                [
                                    [w, c, w],
                                    [c, c, w],
                                    [w, c, w]
                                ],
                                [
                                    [w, c, w],
                                    [c, c, c],
                                    [w, w, w]  
                                ],
                                [
                                    [w, c, w],
                                    [w, c, c],
                                    [w, c, w]
                                ]
                            ]
            
        }
    }

    switchVariant(){
        const nextPhase = this.rotation + 1;
        if (nextPhase < this.variant.length){
            this.shape = this.variant[nextPhase];
            this.rotation++;
        }
        else{
            this.shape = this.variant[0]
            this.rotation = 0;
        }

    }
}