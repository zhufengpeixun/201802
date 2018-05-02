// var point = {
//     x: 10,
//     y: 20,
//     moveTo: function (x, y) {
//         //=>this:point
//         //=>x:100 y:200
//
//         var moveX = function (x) {
//             //=>this:window
//             this.x = x;
//         }
//         var moveY = function (y) {
//             //=>this:window
//             this.y = y;
//         }
//         moveX(x);//=>moveX(100)
//         moveY(y);//=>moveY(200)
//     }
// };
// point.moveTo(100, 200);
// console.log(point.x, point.y);//=>10 & 20

/*
var point = {
    x: 10,
    y: 20,
    moveTo: function (x, y) {
        //=>this:point
        //=>x:100 y:200

        /!*var moveX = function (x) {
            //=>this:point
            this.x = x;
        };
        var moveY = function (y) {
            //=>this:point
            this.y = y;
        };
        moveX.call(this,x);
        moveY.call(this,y);*!/

        var moveX = (x) => {
            //=>this:point
            this.x = x;
        };
        var moveY = (y) => {
            //=>this:point
            this.y = y;
        };
        moveX(x);
        moveY(y);

        /!*var _this = this;
        var moveX = function (x) {
            //=>_this:point
            _this.x = x;
        };
        var moveY = function (y) {
            //=>_this:point
            _this.y = y;
        };
        moveX(x);
        moveY(y);*!/
    }
};
point.moveTo(100, 200);
console.log(point.x, point.y);*/


/*
 * JS中的THIS汇总
 *   THIS:当前方法执行的主体(谁执行的这个方法,那么THIS就是谁,所以THIS和当前方法在哪创建的或者在哪执行的都没有必然的关系)
 */
//1.给元素的某个事件绑定方法，方法中的THIS都是当前操作的元素本身
// document.body.onclick = function () {
//     //=>this:body
// };

//2.函数执行，看函数前面是否有点，有的话，点前面是谁THIS就是谁，没有点，THIS是WINDOW（在JS的严格模式下，没有点THIS是UNDEFINED）
// let fn = function () {
//     console.log(this.name);
// };
// let obj = {
//     name: '哈哈',
//     fn: fn
// };
// fn();//=>this:window
// obj.fn();//=>this:obj

//3.构造函数执行，方法中的this一般都是当前类的实例
// let Fn = function () {
//     this.x = 100;//=>this:f
// };
// let f = new Fn;

//4.箭头函数中没有自己的THIS,THIS是上下文中的THIS
// let obj = {
//     fn: function () {
//         // this:obj
//         setTimeout(() => {
//             //this:obj
//         }, 1000);
//     }
// };
// obj.fn();

//5.在小括号表达式中，会影响THIS的指向
// let obj = {
//     fn: function () {
//         console.log(this);
//     }
// };
// obj.fn();//=>this:obj
// ;(12, obj.fn)();//=>this:window

//6.使用call/apply/bind可以改变this指向
// fn.call(obj);//=>this:obj
// fn.call(12);//=>this:12
// fn.call();//=>this:window 非严格模式下call/apply/bind第一个参数不写或者写null和undefined，this都是window，严格模式下写谁this就是谁，不写是undefined