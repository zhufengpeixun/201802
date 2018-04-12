var i = 2;
function fn() {
    i += 2;
    return function (n) {
        console.log(n + (--i));
    }
}
var f=fn();
f(2);
f(3);
fn()(2);
fn()(3);
f(4);