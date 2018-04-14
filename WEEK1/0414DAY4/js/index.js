var oTab = document.getElementById('tab'),
    tabList = oTab.getElementsByTagName('li'),
    divList = oTab.getElementsByTagName('div');

function changeTab(curIndex) {
    for (var i = 0; i < tabList.length; i++) {
        tabList[i].className = divList[i].className = '';
    }
    //=>curIndex:记录的是当前点击LI的索引
    tabList[curIndex].className = 'active';
    divList[curIndex].className = 'active';
}

/*
for (var i = 0; i < tabList.length; i++) {
    tabList[i].onclick = function () {
        changeTab(i);
        //=>执行方法，形成一个私有的栈内存，遇到变量I，I不是私有变量，向上一级作用域查找（上级作用域WINDOW）
        //=>所有的事件绑定都是异步编程（同步编程：一件事一件事的做，当前这件事没完成，下一个任务不能处理 / 异步编程：当前这件事件没有彻底完成，不在等待，继续执行下面的任务），绑定事件后，不需要等待执行，继续执行下一个循环任务，所以当我们点击执行方法的时候，循环早已结束（让全局的I等于循环最后的结果3）
    }
}
*/

//=>解决方案：自定义属性
/*for (var i = 0; i < tabList.length; i++) {
    tabList[i].myIndex = i;
    tabList[i].onclick = function () {
        changeTab(this.myIndex);
        //=>THIS:给当前元素的某个事件绑定方法,当事件触发,方法执行的时候,方法中的THIS是当前操作的元素对象
    }
}*/

//=>解决方案：闭包
/*for (var i = 0; i < tabList.length; i++) {
    tabList[i].onclick = (function (n) {
        //=>让自执行函数执行,把执行的返回值(RETURN)赋值给ON-CLICK（此处ON-CLICK绑定的是返回的小函数，点击的时候执行的是小函数），自执行函数在给事件赋值的时候就已经执行了
        var i = n;
        return function () {
            changeTab(i);//=>上级作用域：自执行函数形成的作用域
        }
    })(i);
}*/
/*
 * i=0 第一次循环
 *   tabList[0].onclick = (function(n){
 *      //=>自执行函数执行形成一个私有作用域（不释放：返回的函数对应的堆地址被外面的事件占用了）
 *      //1.形参赋值 n=0
 *      //2.变量提升 var i;
 *      var i=n; //=>i=0
 *      return function(){//=>点击的时候执行的是小函数
 *         changeTab(i);
 *      }
 *   })(i);//=>把本次全局I(0)当做实参传递给形参n
 *
 * i=1 第二次循环
 *   tabList[1].onclick = (function(n){
 *      var i=n; //=>i=1
 *      return function(){
 *         changeTab(i);
 *      }
 *   })(1);
 *
 * ...
 *
 * 总结：循环三次，形成三个不销毁的私有作用域（自执行函数执行），而每一个不销毁的栈内存中都存储了一个私有变量I，而这个值分别是每一次执行传递进来的全局I的值（也就是：第一个不销毁的作用域存储的是0，第二个是1，第三个是2）；当点击的时候，执行返回的小函数，遇到变量I，向它自己的上级作用域查找，找到的I值分别是：0/1/2，达到了我们想要的效果；
 */

/*for (var i = 0; i < tabList.length; i++) {
    /!*原理都是形成三个不销毁的私有作用域,分别存储需要的索引值*!/
    (function (n) {
        tabList[n].onclick = function () {
            changeTab(n);
        }
    })(i);
}*/

//=>解决方案：基于ES6解决
for (let i = 0; i < tabList.length; i++) {
    tabList[i].onclick = function () {
        changeTab(i);
    }
}

//=>基于ES6中的LET来创建变量,是存在块级作用域的(类似于私有作用域)
//作用域：（栈内存）
//1.全局作用域
//2.私有作用域（函数执行）
//3.块级作用域（一般用大括号包起来的都是块级作用域，前提是ES6语法规范）

/*
{
    let a = 12;
    console.log(a);//=>12
}
console.log(a);//=>Uncaught ReferenceError: a is not defined
*/

/*let a = 100;
{
    let a = 100;
    {
        {
            console.log(a);//=>100
        }
    }
}
*/

/*if (1 === 1) {
    //=>判断体也是块级作用域
    let a = 12;
}
console.log(a);//=>Uncaught ReferenceError: a is not defined*/

/*for (let i = 0; i < 5; i++) {
    //=>循环体也是块级作用域，初始值设置的变量是当前本次块级作用域中的变量(形成了五个块级作用域，每个块级作用域中都有一个私有变量I，变量值就是每一次循环I的值)
}
console.log(i);//=>Uncaught ReferenceError: i is not defined*/

// var obj={};//=>对象的大括号不是块级作用域

