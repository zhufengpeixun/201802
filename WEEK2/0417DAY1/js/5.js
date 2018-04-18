//=>1.在严格模式下不支持使用 “arguments.callee / arguments.callee.caller” （Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them）

//=>2.在严格模式下ARGUMENTS和形参没有映射机制
//=>3.在严格模式下不允许给一个对象设置重复属性名的：“obj={n:10,n:20}”
//=>4.在严格模式下，函数执行，如果没有明确指定执行的主体（函数前面没有点），不再像非严格模式下一样，统一都交给window，而是让this指向undefined，代表没有执行主体：“严格模式下，有执行主体this就指向谁，没有执行主体，this就是undefined”

//=>高程三，最后有严格模式和非严格模式汇总

~function () {
    /*function fn(x) {
        arguments[0]=100;
        console.log(x);//=>100 存在映射机制
    }
    fn(10);*/

    /*var obj={
        n:10,
        n:20
    };
    console.log(obj.n);*/

    function fn() {
        console.log(this);//=>window
    }
    fn();
}();

~function () {
    "use strict";
    /*function fn(x) {
        arguments[0]=100;
        console.log(x);//=>10 不存在映射机制
    }
    fn(10);*/

    /*var obj={
        n:10,
        n:20
    };
    console.log(obj.n);*/

    function fn() {
        console.log(this);//=>undefined
    }
    fn();
}();