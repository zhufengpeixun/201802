var btnBox = document.getElementById('btnBox'),
    inputs = btnBox.getElementsByTagName('input');
/*for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = function () {
        alert(i);
    }
}*/
/*
 * 1.为啥不行？
 *   事件绑定是“异步编程”，当触发点击行为，绑定的方法执行的时候，外层循环已经结束；方法执行产生私有作用域，用到变量i，不是私有的变量，按照“作用域链”的查找机制，找到的是全局下的i（此时全局的i已经成为循环最后一次的结果3）
 *
 * 2.如何解决?
 *  ->自定义属性
 *  ->闭包
 *  ->ES6
 */
/*
//=>利用闭包的机制，把后期需要的索引实现存储到自己的私有作用域中：“闭包有保存作用”
for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = (function (i) {
        return function () {
            alert(i);
        }
    })(i);//=>把每一次循环时候i(全局的)的值传递给自执行函数
}
*/

//=>ES6和闭包的机制类似，ES6中使用LET创建变量，会形成块级作用域，当前案例中，每一轮循环都会有一个自己的块级作用域，把后续需要用到的索引i实现存储到自己的作用域中
for (let i = 0; i < inputs.length; i++) {
    inputs[i].onclick = function () {
        alert(i);
    }
}
/*{
    let i=0;
    inputs[0].onclick = function () {
        alert(i);
    }
}
{
    let i=1;
    inputs[0].onclick = function () {
        alert(i);
    }
}*/
