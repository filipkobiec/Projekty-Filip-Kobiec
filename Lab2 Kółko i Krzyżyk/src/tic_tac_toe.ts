class Board{
    private cells: Cell[]

    constructor(){
        this.cells = new Array()
        this.draw_board()
        for (let i = 0; i < 9; i++){
            let htmlCell = <HTMLDivElement>document.getElementById("cell_" + (i))
            let cell = new Cell(this, i, htmlCell)
            this.cells.push(cell)
        }
    }

    draw_board() {
        const board = document.querySelector(".board")
        board.innerHTML = ''
        for (let i = 0; i < 9; i++){
            board.innerHTML += `<div id="cell_${i}" class="cell"></div>`
        }
    }


    is_win(): boolean {
        return true
    }

}

class Cell{
    board: Board
    index: number
    htmlElement: HTMLDivElement
    content: string

    constructor(board: Board, index: number, htmlElement: HTMLDivElement) {
        this.board = board
        this.index = index
        this.htmlElement = htmlElement
        this.htmlElement.onclick = () => this.handle_click()
    }

    handle_click() {
        if (this.htmlElement.innerHTML === "") 
            if (turn === 0)
                this.htmlElement.innerHTML = "O"
            else
                this.htmlElement.innerHTML = "X"
        
        switch_turn(turn)
    }
}

let turn = 0

const switch_turn = (current_turn: number) => {
    if (current_turn === 0) 
        turn = 1
    else
        turn = 0
}


window.onload = () => {
    const board = new Board()
}