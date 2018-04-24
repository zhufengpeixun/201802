/*
let a = {n: 4};
let b = a;
//=> b=AAAFFF000  =>{n:4,x:AAAFFF111}
b.x = a = {n: 10};
//=>AAAFFF111 =>{n:10}
//b.x=AAAFFF111
//a=AAAFFF111 =>{n:10}
console.log(a.x);//=>undefined
console.log(b.x);//=>{n:10}
*/

/*
function C1(name) {//=>undefined
    if (name) this.name = name; //=>没有给实例THIS设置私有属性
}
function C2(name) {//=>undefined
    this.name = name;//=>给实例THIS设置私有属性NAME:UNDEFINED
}
function C3(name) {//=>undefined
    this.name = name || 'join';//=>给实例THIS设置私有属性NAME:JOIN
}
C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';
alert(new C1().name + new C2().name + new C3().name);//=>"Tomundefinedjoin"*/

/*
function C1(name) {
    this.name = name || 'join';
}
function C2(name) {
    name ? this.name = name : null;
}
function C3(name) {
    this.name = name && 'join';
}
C1.prototype.name = 'tom';
C2.prototype.name = 'tom';
C3.prototype.name = 'tom';
alert(new C1().name + new C2().name + new C3().name);*/

let Fn = function (x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.getX = function () {
        console.log(this.x);
    }
};
Fn.prototype.getY = function () {
    console.log(this.y);
};
Fn.prototype = {
    // constructor:Fn,
    setX: function (val) {
        this.x = val;
    },
    getX: function () {
        console.log(this.x);
    }
};
let f1 = new Fn;
let f2 = new Fn(1, 2);
console.log(f1.constructor);//=>Object
f1.setX(3);//=>this:f1 =>f1.x = 3; (把f1的私有属性改为3) [设置无输出]
f1.getX();//=>this:f1 =>f1.x =>3
f1.__proto__.getX();//=>this:f1.__proto__ =>f1.__proto__.x =>undefined
f1.__proto__.setX(4);//=>this:f1.__proto__ =>f1.__proto__.x = 4 给f1对应类的原型上设置x属性值为4   [设置无输出]
f2.getX();//=>this:f2 =>f2.x =>1
f2.__proto__.getX();//=>this:f2.__proto__ =>f2.__proto__.x =>4
f2.getY();//=>undefined() 报错
