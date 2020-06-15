var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./main.scss');
var scene;
var Circle = (function () {
    function Circle(x, y, radius, htmlElement) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.htmlElement = htmlElement;
    }
    return Circle;
})();
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y, radius, htmlElement) {
        _super.call(this, x, y, radius, htmlElement);
        this.speed_x = 0;
        this.speed_y = 0;
        this.factor = 5;
        this.htmlElement.style.width = this.radius * 2 + 'px';
        this.htmlElement.style.height = this.radius * 2 + 'px';
    }
    return Ball;
})(Circle);
var Board = (function () {
    function Board() {
        this.ball = new Ball(40, 50, 20, document.querySelector('#ball'));
    }
    Board.prototype.animate = function () {
        this.ball.y += this.ball.speed_x;
        this.ball.x += this.ball.speed_y;
        this.ball.htmlElement.style.top = this.ball.y + 'px';
        this.ball.htmlElement.style.left = this.ball.x + 'px';
    };
    return Board;
})();
var board = new Board();
update();
function onDeviceOrientationChange(e) {
    board.ball.speed_y = e.alpha * board.ball.factor;
    board.ball.speed_x = e.beta * board.ball.factor;
}
function update() {
    board.animate();
    window.requestAnimationFrame(update);
}
window.addEventListener('deviceorientation', onDeviceOrientationChange);
