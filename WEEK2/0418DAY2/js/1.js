/*
 * 在实际项目基于面向对象开发的时候(构造原型设计模式),我们根据需要,很多时候会重定向类的原型(让类的原型指向自己开辟的堆内存)
 *  [存在的问题]
 *  1.自己开辟的堆内存中没有constructor属性,导致类的原型构造函数缺失（解决：自己手动在堆内存中增加constructor属性）
 *  2.当原型重定向后，浏览器默认开辟的那个原型堆内存会被释放掉，如果之前已经存储了一些方法或者属性，这些东西都会丢失（所以：内置类的原型不允许重定向到自己开辟的堆内存，因为内置类原型上自带很多属性方法，重定向后都没了，这样是不被允许的）
 */
/*function Fn() {

}
//=>当我们需要给类的原型批量设置属性和方法的时候,一般都是让原型重定向到自己创建的对象中
Fn.prototype = {
    constructor: Fn,
    aa: function () {

    }
};*/


/*
function fun() {
    this.a = 0;
    this.b = function () {
        alert(this.a);
    }
}

fun.prototype = {
    b: function () {
        this.a = 20;
        alert(this.a);
    },
    c: function () {
        this.a = 30;
        alert(this.a)
    }
};
var my_fun = new fun();
my_fun.b();
my_fun.c();*/


function Fn() {
    var n = 10;
    this.m = 20;
    this.aa = function () {console.log(this.m);}
}
Fn.prototype.bb = function () {console.log(this.n);};
var f1=new Fn;
Fn.prototype={
    aa:function(){console.log(this.m+10);}
};
var f2=new Fn;
console.log(f1.constructor);
console.log(f2.constructor);
f1.bb();
f1.aa();
// f2.bb();
f2.aa();
f2.__proto__.aa();








