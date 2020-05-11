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
        const description = document.querySelector(".description")
        board.innerHTML = ''
        for (let i = 0; i < 9; i++){
            board.innerHTML += `<div id="cell_${i}" class="cell"></div>`
        }
        board.innerHTML += `<div id="current_player">player: ${player}</div>`
        board.innerHTML += `<div>player one  points: ${player_one}</div>`
        board.innerHTML += `<div>player two points: ${player_two}</div>`
    }


    is_win(): boolean {
        // horizontal
        let cells_to_check = new Set()
        for (let i = 0; i < 9; i += 3) {
            cells_to_check.add(this.cells[i].content).add(this.cells[i+1].content).add(this.cells[i+2].content)
            if (cells_to_check.size === 1 && !cells_to_check.has('')){
                return true
            }
            cells_to_check.clear()
        }
        // vertical
        for (let i = 0; i < 3; i ++){
            cells_to_check.add(this.cells[i].content).add(this.cells[i+3].content).add(this.cells[i+6].content)
            if (cells_to_check.size === 1 && !cells_to_check.has('')){
                return true
            }
            cells_to_check.clear()
        }
        return false
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
        this.content = ""
        this.htmlElement = htmlElement
        this.htmlElement.onclick = () => this.handle_click()
    }

    handle_click() {
        if (this.content === "") 
            if (player === 1){
                this.content = "O"
                this.htmlElement.innerHTML = "O"
            }
            else{
                this.content = "X"
                this.htmlElement.innerHTML = "X"
            }   
        let win = this.board.is_win()
        if (win == true){
            alert("Winner: " + player)
            if (player == 1)
                player_one += 1
            else
                player_two += 1
            this.board = new Board()
        }
        switch_player(player)
        document.getElementById("current_player").innerHTML = `player: ${player}`
    }
}

let player = 1
let player_one = 0
let player_two = 0

const switch_player = (current_player: number) => {
    if (current_player === 1) 
        player = 2
    else
        player = 1
}


window.onload = () => {
    const board = new Board()
}