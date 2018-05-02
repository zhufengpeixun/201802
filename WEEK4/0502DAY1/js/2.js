var n = 2;
function a() {
    var n = 3;
    function b(m) {
        alert(++n + m);
    }
    b(4);
    return b;
}
var c = a(5);
c(6);
alert(n);