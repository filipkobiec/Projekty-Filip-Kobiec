import {Cell} from "./cell"
export class Board{
    private cells: Cell[]
    player: number = 1
    player_one: number = 0
    player_two: number = 0

    constructor(){
        this.cells = new Array();
    }

    start_game(){
        this.draw_board();
        for (let i = 0; i < 9; i++){
            let htmlCell = document.getElementById("cell_" + (i));
            htmlCell.onclick =  () => this.handle_click(i)
            let cell = new Cell(i, htmlCell);
            this.cells.push(cell);
        }
    }

    handle_click(i: number) {
        if (this.cells[i].content === "") 
            if (this.player === 1){
                this.cells[i].content = "O"
            }
            else{
                this.cells[i].content = "X"
            }   
        let win = this.is_win()
        if (win == true){
            alert("Winner: " + this.player)
            if (this.player == 1)
                this.player_one += 1
            else
                this.player_two += 1
            this.reset_board();
        }
        this.switch_player(this.player)
        document.getElementById("current_player").innerHTML = `player: ${this.player}`
    }
    draw_board() {
        const board = document.querySelector(".board");
        board.innerHTML = '';
        for (let i = 0; i < 9; i++){
            let row: HTMLDivElement = document.createElement('div');
            row.id = `cell_${i}`;
            row.className = "cell";
            board.appendChild(row);
        }
        board.innerHTML += `<div id="current_player">player: ${this.player}</div>`
        board.innerHTML += `<div>player one  points: ${this.player_one}</div>`
        board.innerHTML += `<div>player two points: ${this.player_two}</div>`
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

        for (let i = 0; i < 9; i += 4){
            cells_to_check.add(this.cells[i].content)
        }
        if (cells_to_check.size === 1 && !cells_to_check.has('')){
            return true
        }
        
        cells_to_check.clear()

        for (let i = 2; i < 8; i += 2){
            cells_to_check.add(this.cells[i].content)
        }
        if (cells_to_check.size === 1 && !cells_to_check.has('')){
            return true
        }
          
        return false
    }

    reset_board(){
        for (let i = 0; i < this.cells.length; i++){
            this.cells[i].content = '';
        }
        this.draw_board();
        this.start_game();
    }

    switch_player = (current_player: number) => {
        if (current_player === 1) 
            this.player = 2
        else
            this.player = 1
    }
}