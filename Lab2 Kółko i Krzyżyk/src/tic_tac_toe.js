var Board = /** @class */ (function () {
    function Board() {
        this.cells = new Array();
        this.draw_board();
        for (var i = 0; i < 9; i++) {
            var htmlCell = document.getElementById("cell_" + (i));
            var cell = new Cell(this, i, htmlCell);
            this.cells.push(cell);
        }
    }
    Board.prototype.draw_board = function () {
        var board = document.querySelector(".board");
        board.innerHTML = '';
        for (var i = 0; i < 9; i++) {
            board.innerHTML += "<div id=\"cell_" + i + "\" class=\"cell\"></div>";
        }
    };
    Board.prototype.is_win = function () {
        // horizontal
        var cells_to_check = new Set();
        for (var i = 0; i < 9; i += 3) {
            cells_to_check.add(this.cells[i].content).add(this.cells[i + 1].content).add(this.cells[i + 2].content);
            if (cells_to_check.size === 1 && !cells_to_check.has('')) {
                return true;
            }
            cells_to_check.clear();
        }
        // vertical
        for (var i = 0; i < 9; i += 3) {
            cells_to_check.add(this.cells[i].content).add(this.cells[i + 3].content).add(this.cells[i + 6].content);
            if (cells_to_check.size === 1 && !cells_to_check.has('')) {
                return true;
            }
            cells_to_check.clear();
        }
        return false;
    };
    return Board;
}());
var Cell = /** @class */ (function () {
    function Cell(board, index, htmlElement) {
        var _this = this;
        this.board = board;
        this.index = index;
        this.content = "";
        this.htmlElement = htmlElement;
        this.htmlElement.onclick = function () { return _this.handle_click(); };
    }
    Cell.prototype.handle_click = function () {
        if (this.content === "")
            if (player === 1) {
                this.content = "O";
                this.htmlElement.innerHTML = "O";
            }
            else {
                this.content = "X";
                this.htmlElement.innerHTML = "X";
            }
        switch_player(player);
        var win = this.board.is_win();
        if (win == true) {
            alert("Winner: " + player);
        }
    };
    return Cell;
}());
var player = 1;
var switch_player = function (current_player) {
    if (current_player === 1)
        player = 2;
    else
        player = 1;
};
window.onload = function () {
    var board = new Board();
};
