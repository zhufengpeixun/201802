/*
 * 面向对象：类的继承封装和多态
 *   [封装]
 *     把实现一个功能的JS代码进行封装，主要目的：“低耦合高内聚”
 *
 *   [多态]
 *     重载：方法名相同，参数的个数或者类型不同，此时名字相同的方法叫做方法的重载（后台语言中的重载），JS中不存在重载的
 *     重写：子类重写父类的方法
 *
 *   [继承]
 *     子类继承父类的属性和方法
 *     1. 原型继承
 *     2. call继承
 *     3. 寄生组合继承
 *     4. ES6中class类实现继承
 *     ...
 */
// public void fn(int n,int m){
//
// }
// public void fn(string n,string m){
//
// }
// public void fn(int n,int m,int z){
//
// }
// //=>根据传递参数的不同执行不同的方法

// function fn(n, m) {
//
// }
//
// function fn(n, m, x) {
//     //=>后面的方法会把前面的方法覆盖掉，不管传递多少实参，执行的都是后面的这个方法（JS中的重载指的是：同一个方法根据传参不一样，实现不同的功能）
// }
//
// fn(10, 20);
// fn(10, 20, 30);

//=>原型继承：让子类的原型指向父类的一个实例

// function A() {
//     this.x = 100;
// }
// A.prototype = {
//     constructor: A,
//     getX: function () {
//         console.log(this.x);
//     }
// };
// function B() {
//     this.y = 200;
// }
// B.prototype = new A();
// let f = new B();

//=>CALL继承：把父类A做为普通函数执行，让A中的THIS变为B的实例，相当于给B的实例增加一些属性和方法（弊端：把父类A当做普通函数执行，和父类原型没啥关系了，仅仅是把A中的私有属性变为子类B实例的私有属性而已，A原型上的公有属性方法和B及它的实例没啥关系）

//new A() 把A作为类创建它的实例 this:实例
//A() 把A作为普通函数执行 this:window
// function A() {
//     //=>this:f
//     this.x = 100; //=>f.x=100
// }
// A.prototype = {
//     constructor: A,
//     getX: function () {
//         console.log(this.x);
//     }
// };
// function B() {
//     //=>this:f
//     A.call(this);//=>call继承  把A执行，让A中的this变为f
//     this.y = 200;
// }
// let f = new B();

//=>寄生组合继承：A的私有变为B的私有，A的公有变为B的公有

// function A() {
//     this.x = 100;
// }
// A.prototype = {
//     constructor: A,
//     getX: function () {
//         console.log(this.x);
//     }
// };
// function B() {
//     A.call(this);//=>基于CALL把A的私有变为B的私有  f.x=100
//     this.y = 200;
// }
// // B.prototype = A.prototype; //=>一般都不这样处理，因为这种模式可以轻易修改父类A原型上的东西（重写“太方便”了），这样会导致A的其它实例也受到影响
// B.prototype=Object.create(A.prototype);
// let f = new B();

/*
 * Object.create：内置Object类天生自带的方法
 *   1.创建一个空对象
 *   2.让新创建的空对象的__proto__指向第一个传递进来的对象（把OBJ作为新创建空对象的原型）
 */
// let obj={
//     name:'哈哈'
// };
// console.log(Object.create(obj));

//=>ES6中的类和继承

//1.ES6中创建类是有自己标准语法的（这种语法创建出来的类只能NEW执行，不能当做普通函数执行）
// class Fn {//=>Fn是类名，没有小括号
//     constructor(n, m) {
//         //=>等价于传统ES5类的构造体
//         this.x = n;
//         this.y = m;
//     }
//
//     //=>给Fn的原型上设置方法（只能设置方法不能设置属性）
//     getX() {
//         console.log(this.x);
//     }
//
//     //=>把Fn当做一个普通对象设置的私有方法（和实例没有关系），同样也只能设置方法不能写属性
//     static AA(){
//
//     }
// }
// // Fn.prototype.BB = 100;
// // Fn.xxx = 'xxx';
// let f = new Fn(10, 20);

// function Fn(n,m){
//     this.x=n;
//     this.y=m;
// }
// Fn.prototype.getX=function(){}
// Fn.prototype.BB=100;
// Fn.AA=function(){} //=>把Fn当做一个普通对象设置的私有方法(和实例没关系)

class A {
    constructor() {
        this.x = 100;
    }

    getX() {
        console.log(this.x);
    }
}

class B extends A {//=>extends类似于实现了原型继承
    constructor() {
        super();//=>类似于CALL继承：在这里SUPER相当于把A的CONSTRUCTOR给执行了，并且让方法中的THIS是B的实例，SUPER当中传递的实参都是在给A的CONSTRUCTOR传递
        this.y = 200;
    }

    getY() {
        console.log(this.y);
    }
}

let f = new B();








