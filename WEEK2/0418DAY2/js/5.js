function Fn() {
    this.n = 100;
}
Fn.prototype.getN = function () {
    console.log(this.n);
};
Fn.AA = 200;
var f=new Fn();