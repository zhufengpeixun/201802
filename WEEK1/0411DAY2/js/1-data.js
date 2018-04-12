var a = 12;
/*
 * 1.先声明一个变量a，没有赋值（默认值是undefined）
 * 2.在当前作用域中开辟一个位置存储12这个值
 * 3.让变量a和12关联在一起（定义：赋值）
 */
var b = a;
b = 13;
console.log(a);

/*var ary1 = [12, 23];
var ary2 = ary1;
ary2.push(100);
console.log(ary1);*/

function sum() {
    var total = null;
    for (var i = 0; i < arguments.length; i++) {
        var item = arguments[i];
        item = parseFloat(item);
        !isNaN(item) ? total += item : null;
    }
    return total;
}
console.log(sum(12, 23, '34', 'AA'));
