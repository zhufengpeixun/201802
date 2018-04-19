let n = 10,
    obj = {n: 20};
let fn = obj.fn = (function () {
    this.n++;
    n++;
    return function (m) {
        n += 10 + (++m);
        this.n += n;
        console.log(n);
    }
})(obj.n);
fn(10);
obj.fn(10);
console.log (n, obj.n);