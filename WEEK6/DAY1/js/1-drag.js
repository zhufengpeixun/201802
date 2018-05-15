let box = document.querySelector('#box');

let down = function down(ev) {
    this.strX = ev.clientX;
    this.strY = ev.clientY;
    this.strL = this.offsetLeft;
    this.strT = this.offsetTop;

    this.MOVE = move.bind(this);
    this.UP = up.bind(this);
    document.addEventListener('mousemove', this.MOVE);
    document.addEventListener('mouseup', this.UP);

};

let move = function move(ev) {
    this.curL = ev.clientX - this.strX + this.strL;
    this.curT = ev.clientY - this.strY + this.strT;
    this.style.left = this.curL + 'px';
    this.style.top = this.curT + 'px';
};

let up = function up() {
    document.removeEventListener('mousemove', this.MOVE);
    document.removeEventListener('mouseup', this.UP);
};

box.onmousedown = down;