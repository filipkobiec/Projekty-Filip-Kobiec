var App = (function () {
    function App() {
        this.boardWidth = 10;
        this.boardHeight = 20;
        this.initialize();
    }
    App.prototype.initialize = function () {
        var gameCanvas = new GameCanvas('game', this.boardWidth, this.boardHeight);
    };
    return App;
})();
exports.App = App;
var GameCanvas = (function () {
    function GameCanvas(containerId, width, height) {
        this.initialize(containerId, width, height);
    }
    GameCanvas.prototype.initialize = function (containerId, width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 800;
        canvas.id = 'board';
        var container = document.querySelector('#' + containerId);
        container.appendChild(canvas);
        var ctx = canvas.getContext('2d');
        var boardMatrix = this.createBoardMatrix(width, height);
    };
    GameCanvas.prototype.drawBlock = function (blockType, BlockPosition, ctx) {
        ctx.fillStyle = '#ff0050';
        ctx.fillRect(50, 50, 100, 100);
    };
    GameCanvas.prototype.drawBoard = function (boardMatrix) {
    };
    GameCanvas.prototype.createBoardMatrix = function (width, height) {
        var result = [];
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                result[i][j] = 0;
            }
        }
        return result;
    };
    return GameCanvas;
})();
exports.GameCanvas = GameCanvas;
var GameLoop = (function () {
    function GameLoop(gameCanvas, width, height) {
        this.readonly = blockSpeed;
        this.gameCanvas = gameCanvas;
        this.boardWidth = width;
        this.boardHeight = height;
    }
    GameLoop.prototype.start = function () {
    };
    return GameLoop;
})();
exports.GameLoop = GameLoop;
readonly;
type: BlockType;
readonly;
color: string;
position: BlockPosition;
isActive: boolean;
width: number;
height: number;
shape: number[][];
setPosition(position, Position);
void ;
getPosition(position, Position);
Position;
;
var BlockType;
(function (BlockType) {
    BlockType[BlockType["square"] = 0] = "square";
    BlockType[BlockType["line"] = 1] = "line";
})(BlockType || (BlockType = {}));
