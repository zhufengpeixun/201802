class Parent {
    constructor(x, y) {
        //=>给实例设置私有的属性
        this.x = x;
        this.y = y;
    }

    //=>Parent.prototype
    render() {
        //=>this.render()
    }

    //=>把Parent当做一个普通的对象，设置的私有属性方法，和实例没关系
    static ajax() {
        //=>Parent.ajax()
    }
}

Parent.prototype.AA = 12;//=>ES6创建类的大括号中只能写方法（而且不能是箭头函数），不能设置属性，属性需要自己额外拿出来设置
Parent.BB = 12;//=>把它作为对象设置的私有属性也只能拿到外面设置

//====================
class Children extends Parent {
    constructor() {
        super(10, 20);//=>Parent.constructor.call(this,10,20)
        /*Parent.constructor(x, y) {
            //=>给实例设置私有的属性
            this.x = x;
            this.y = y;
        }*/
        // this.x =10
        // this.y =20
        // this.ajax(); //=>this.ajax is not a function  子类只能继承父类原型上的属性和方法和父类实例私有的属性和方法，对于父类作为普通对象设置的私有属性和方法是无法继承的
    }

    render() {

    }
}

console.dir(new Children());
/*
 * {
 *    x:10,
 *    y:20,
 *    __proto__:Children.prototype
 *       render
 *       __proto__:Parent.prototype
 *          render
 *          AA:12
 *          __proto__:Object.prototype
 * }
 */











