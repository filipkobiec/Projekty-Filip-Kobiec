class Board{
    play_board = ["", "", "", "", "", "", "", "", ""];

    constructor(){
        this.draw_board()
    }

    draw_board() {
        const board = document.querySelector(".board")
        board.innerHTML = ''
        this.play_board.forEach((e, i) => {
            board.innerHTML += `<div id="block_${i}" class="block"></div>`
        });
    }

}

class Cell{

}

window.onload = () => {
    const board = new Board()
}