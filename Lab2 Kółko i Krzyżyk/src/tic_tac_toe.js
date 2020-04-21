var Board = /** @class */ (function () {
    function Board() {
        this.play_board = ["", "", "", "", "", "", "", "", ""];
        this.draw_board();
    }
    Board.prototype.draw_board = function () {
        var board = document.querySelector(".board");
        board.innerHTML = '';
        this.play_board.forEach(function (e, i) {
            board.innerHTML += "<div id=\"block_" + i + "\" class=\"block\"></div>";
        });
    };
    return Board;
}());
var Cell = /** @class */ (function () {
    function Cell() {
    }
    return Cell;
}());
window.onload = function () {
    var board = new Board();
};
