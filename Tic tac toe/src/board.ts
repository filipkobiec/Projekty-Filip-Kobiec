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
            let cell = new Cell(i, htmlCell);
            this.cells.push(cell);
        }
        document.addEventListener('keypress', e => this.on_key_down(e.code))
    }
    
    on_key_down(key: any){
        const playerOne = document.querySelector("#playerOne")
        const playerTwo = document.querySelector("#playerTwo")
        switch (key){
            case "KeyQ":
                this.markPlayerMove(0);
                break;
            case "KeyW":
                this.markPlayerMove(1);
                break;
            case "KeyE":
                this.markPlayerMove(2);
                break;
            case "KeyA":
                this.markPlayerMove(3);
                break;
            case "KeyS":
                this.markPlayerMove(4);
                break;
            case "KeyD":
                this.markPlayerMove(5);
                break;
            case "KeyZ":
                this.markPlayerMove(6);
                break;
            case "KeyX":
                this.markPlayerMove(7);
                break;
            case "KeyC":
                this.markPlayerMove(8);
                break;
        }
        let win = this.is_win()
        if (win == true){
            this.switch_player(this.player);
            alert("Winner: " + this.player)
            if (this.player == 1){
                this.player_one += 1
                playerOne.innerHTML = `player one  points: ${this.player_one}`;
            }
            else{
                this.player_two += 1
                playerTwo.innerHTML = `player two  points: ${this.player_two}`;
            }
            if (this.player_one == 10 || this.player_two === 10){
                alert(`Final winner is ${this.player}`)
                this.player_one = 0;
                playerOne.innerHTML = `player one  points: ${this.player_one}`;
                this.player_two = 0;
                playerTwo.innerHTML = `player two  points: ${this.player_two}`;
            }
            this.reset_board();
        }
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
        board.innerHTML += `<div id = "playerOne">player one  points: ${this.player_one}</div>`
        board.innerHTML += `<div id = "playerTwo">player two points: ${this.player_two}</div>`
    }

    markPlayerMove(cellIndex: number){
        if (this.cells[cellIndex].content === ""){
            if (this.player === 1 )
                this.cells[cellIndex].content = "O";
            else
                this.cells[cellIndex].content = "X"
            this.switch_player(this.player);
            document.getElementById("current_player").innerHTML = `player: ${this.player}`
        }
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
            this.cells[i].content ="";
        }
    }

    switch_player = (current_player: number) => {
        if (current_player === 1) 
            this.player = 2
        else
            this.player = 1
    }
}