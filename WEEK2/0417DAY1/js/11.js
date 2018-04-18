/*
 * 1 和 new Number(1)
 * 区别:
 *   前面是一个基本数据类型值
 *   后面是一个引用数据类型值(对象)
 * 相同点：
 *   都是Number这个类的一个实例
 */

/*
 * 函数类型：
 *   1.普通函数
 *   2.构造函数（类：内置类和自己创建的类）
 * 对象类型：
 *   1.普通对象
 *   2.Math \ JSON ...
 *   3.类的实例（数组、正则、日期...）
 *   4.prototype 或者 __proto__
 *   5.arguments或者元素集合等类数组
 *   6.函数也是一种对象
 *   7....
 *   =>万物皆对象
 */

/*
 * 1.每一个函数(类)都有一个prototype(原型)属性,属性值是一个对象：这个对象中存储了当前类供实例调取使用的公有属性和方法
 * 2.在“浏览器默认”给原型开辟的堆内存中有一个属性constructor：存储的是当前类本身
 * 3.每一个对象(实例)都有一个__proto__(原型链)属性，这个属性指向当前实例所属类的原型（不确定所属的类，都指向Object.prototype）
 */

function Fn() {
    this.x = 100;
    this.y = 200;
    this.getX = function () {
        console.log(this.x);
    }
}
Fn.prototype.getX = function () {
    console.log(this.x);
};
Fn.prototype.getY = function () {
    console.log(this.y);
};
var f1 = new Fn;
var f2 = new Fn;
console.log(f1.getX === f2.getX);//=>false
console.log(f1.getY === f2.getY);//=>true
console.log(f1.__proto__.getY === Fn.prototype.getY);//=>true
console.log(f1.__proto__.getX === f2.getX);//=>false
console.log(f1.getX === Fn.prototype.getX);//=>false
console.log(f1.constructor);//=>Fn
console.log(Fn.prototype.__proto__.constructor);//=>Object
f1.getX();//=>this:f1  =>console.log(f1.x);  =>100
f1.__proto__.getX();//=>this:f1.__proto__  =>console.log(f1.__proto__.x); =>undefined
f2.getY();//=>this:f2  =>console.log(f2.y); =>200
Fn.prototype.getY();//=>this:Fn.prototype  =>console.log(Fn.prototype.y); =>undefined