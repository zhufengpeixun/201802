let fn = function fn(x, y, ev) {
    console.log(this, x, y, ev);
    this.val = x + y;
};
let obj = {name: '珠峰'};

// document.body.onclick = fn;//=>FN中的THIS:BODY  X是事件对象  Y是UNDEFINED  //=>需求:触发BODY的点击事件,执行FN,但是需要让FN中的THIS是OBJ,并且给FN传递一个10&20,而且在FN中还需要得到事件对象

// document.body.onclick = fn.bind(obj, 10, 20);//=>基于FUNCTION.PROTOTYPE上的BIND方法可以预先处理THIS，还可以给函数预先传递参数，而且还可以把事件对象等信息最后传递给函数...

//=>在外层包裹一层匿名函数，就可以实现类似于BIND的效果（因为BIND就是这样搞的）
// document.body.onclick = function anonymous(ev) {
//     //=>THIS:BODY EV:事件对象
//     //=>我们的需求是执行FN
//     fn.call(obj, 10, 20, ev);
// };

Function.prototype.myBind = function myBind(context, ...arg) {
    //=>THIS:FN(当前需要处理的函数)
    //=>CONTEXT:OBJ(需要把FN中的THIS改为谁就传递谁)
    //=>ARG:需要传递给FN的实参(数组) [10,20]
    let _this = this;
    return function anonymous(...innerArg) {
        //=>INNER-ARG:可能有值,可能没有值,如果把BIND返回的结果给元素的事件绑定,则事件触发,执行这个匿名函数,会把事件对象传递进来 [ev]
        //=>最后的目的是把FN执行,把THIS改成OBJ,把参数传递给FN即可
        _this.apply(context, arg.concat(innerArg));
    }
};
document.body.onclick = fn.myBind(obj, 10, 20);//=>首先找到原型上的BIND，在BIND方法执行的时候，把FN中的信息进行预先处理
/*
 * 执行BIND形成一个不销毁的私有栈内存(AAA)，返回一个新的匿名函数(每一次返回的不一样:不是相同的堆内存)
 *   [存储的内容]
 *      //=>THIS:FN(当前需要处理的函数)
        //=>CONTEXT:OBJ(需要把FN中的THIS改为谁就传递谁)
        //=>ARG:需要传递给FN的实参(数组)

   document.body.onclick = function anonymous(ev) {} 当我们触发BODY的点击行为，执行的是返回的匿名函数
 */



