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
        return true;
    };
    return Board;
}());
var Cell = /** @class */ (function () {
    function Cell(board, index, htmlElement) {
        var _this = this;
        this.board = board;
        this.index = index;
        this.htmlElement = htmlElement;
        this.htmlElement.onclick = function () { return _this.handle_click(); };
    }
    Cell.prototype.handle_click = function () {
        if (this.htmlElement.innerHTML === "")
            if (turn === 0)
                this.htmlElement.innerHTML = "O";
            else
                this.htmlElement.innerHTML = "X";
        switch_turn(turn);
    };
    return Cell;
}());
var turn = 0;
var switch_turn = function (current_turn) {
    if (current_turn === 0)
        turn = 1;
    else
        turn = 0;
};
window.onload = function () {
    var board = new Board();
};
