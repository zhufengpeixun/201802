// let a = 3,
//     b = 4;
// function A(a) {
//     A = function (b) {
//         alert(a + (--b));
//     };
//     alert(++a);
// }
// A(5);
// A(6);

// (function () {
//     //=>自执行函数执行，形成私有作用域 AA
//     let val = 1;
//     let json = {
//         val: 10,
//         dbl: function () {
//             //=>私有作用域，它的上级作用域是 AA ，和JSON对象没关系（对象不会产生作用域，它就是个堆而已）
//             val *= 2; //=>AA val=2
//         }
//     };
//     json.dbl();
//     alert(json.val + val);//=>'12'
// })();

// let test = (function (i) {
//     //=>不销毁的栈：i = 2
//     return function () {//=>TEST等于这个小函数
//         alert(i *= 2);//=>4 让上级作用域中的I=4
//     }
// })(2);
// test(5);

// let test = (i => () => i *= 2)(2);
// console.log(test(5));

// let n = 2,
//     fn = () => {
//         this.n *= 3;
//         n++;
//         return m => console.log((++n) + m);
//     };
// let f = fn(4);
// f(5);
// fn(4)(5);
// f(6);
// console.log(n);

/*let Fn = function (x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.getX = function () {
        console.log(this.x);
    }
};
Fn.prototype.getX = function () {
    console.log(this.x);
};
let f1 = new Fn;
Fn.prototype = {
    getY: function () {
        console.log(this.y);
    }
};
let f2 = new Fn(1, 2);
console.log(f1.constructor === f2.constructor);
f1.getX();
// f1.getY();//=>Uncaught TypeError: f1.getY is not a function
f1.__proto__.getX();
// f1.__proto__.getY();
f2.getX();
f2.getY();
f2.__proto__.getX();
f2.__proto__.getY();*/

// let fn1=function(){alert(1)},
//     fn2=function(){alert(2)};
// fn1.call(fn2);//=>1
// fn1.call.call(fn2);//=>2

/*
 * 函数的角色
 *   1.函数（普通函数、类）
 *   2.对象
 */
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};//=>给FOO设置属性(FOO.XXX)
Foo.prototype.getName = function () {
    console.log(3);
};//=>给FOO的原型设置公有属性方法(NEW FOO().XXX)
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}

Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
