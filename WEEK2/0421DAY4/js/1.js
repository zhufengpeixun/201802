function Fn() {
    this.x = 100;
}

//=>原型重定向(重新指向一个自己开辟的堆内存：当我们需要向自定义类的原型上批量增加属性或者方法的时候，一般都采用这种重定向方法)
//1.原有浏览器默认开辟的堆内存如果不被占用会被销毁，如果我们在原有开辟的原型上增加了一些属性和方法，这些方法都会被释放掉，实例也不能使用了
//2.重定向到自己开辟的堆内存中，constructor属性是没有的（为了保证机制的完整性，我们一般都自己手动设置constructor）
Fn.prototype = {
    // constructor:Fn,
    setX: function () {
        this.x = 200;
    },
    getX: function () {
        console.log(this.x);
    }
};
Fn.y = 300;
var f = new Fn;//=>new Fn; 无参数列表NEW  <==> new Fn();有参数列表NEW

// console.log(Fn.y);//=>300
// f.create();//=>报错：f.create它是undefined，不是一个函数
// console.log(f.constructor);//=>Object

/*f.setX();
//=>f.setX(): f这个实例通过__proto__找到原型上的setX，把setX方法执行
//=>1.确定执行哪个方法  2.确定方法中的this（f） 3.套代码  this.x = 200=>f.x=200 (把f的"私有属性"x修改为200)
f.__proto__.setX();//=>f.__proto__.x = 200;  给所属类的原型上设置一个属性x，值是200*/

/*f.getX();//=>f.x 100
f.__proto__.getX();//=>f.__proto__.x  undefined
Fn.prototype.getX();//=>Fn.prototype.x undefined*/