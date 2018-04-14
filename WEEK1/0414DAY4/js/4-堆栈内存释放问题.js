//=>查找上级作用域：
//当前函数FN执行形成一个私有作用域(栈)[AA]，AA的上级作用域和FN在哪执行的没有任何关系，只和FN是在哪创建的有关系
/*
var n = 10;
function fn() {
    console.log(n);
}
fn();//=>10
~function () {
    var n = 100;
    fn();//=>10 和FN在哪执行没有任何的关系,只和在哪创建的有关系(在全局创建的,所以FN执行形成的私有作用域AA的上级作用域永远是WINDOW)
}();
*/

/*
var i = 2;

function fn() {
    var i = 3;
    return function (n) {
        console.log(n + (++i));
    }
}

var f = fn(4);
f(2);
fn(5)(2);
fn(6)(3);
f(3);
*/

/*
 * ++i：先累加在运算
 * i++：先运算在累加
 */
/*
var i = 2;
console.log(5 + (i++) + (++i) + 4 + (--i) + (i--) + 3 + (i++) + (--i), i);
/!*
 5+(2++) =>7  i=3
 7+(++3) =>11 i=4
 11+4 =>15
 15+(--4) =>18 i=3
 18+(3--) =>21 i=2
 21+3 =>24
 24+(2++) =>26 i=3
 26+(--3) =>28 i=2
 *!/
*/

let i = 1;
let fn = function (n) {
    i *= 2;
    return function (m) {
        i += n + m;
        console.log(i);
    }
};
let f = fn(2);
f(3);//=>7
fn(2)(3);//=>19
f(4);//=>25
f(5);//=>32