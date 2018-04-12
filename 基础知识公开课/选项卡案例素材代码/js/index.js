/*
 * 1.点击某一个页卡，让当前页面及对应的DIV有ACTIVE选中样式，而其余的页卡和对应的DIV移除选中样式
 *   变化：不管点击的谁，先让所有的LI和DIV都没有选中样式，再让当前点击的这个有选中样式
 *
 * 2.如何设置元素的CLASS：元素对象.className='active'/''
 */

var oTab = document.getElementById('tab'),
    tabList = oTab.getElementsByTagName('li'),
    divList = oTab.getElementsByTagName('div');

//=>封装页卡切换的方法
function changeTab(curIndex) {
    //1.清空所有LI和DIV的选中样式
    for (var i = 0; i < tabList.length; i++) {
        tabList[i].className = '';
        divList[i].className = '';
    }
    //2.点击的是谁,就让谁有选中的样式
    //需求：封装方法的时候，我们还不知道用户点击的是谁呢，只有用户点击执行这个方法才会知道，此时我们应该给函数设置一个形参变量：当执行这个方法的时候，让用户告诉我点击的是谁即可
    //curIndex:提供的形参入口,传递给我们的是当前点击的这个LI的索引
    //tabList[curIndex]:当前点击的LI
    tabList[curIndex].className = 'active';
    divList[curIndex].className = 'active';
}

/*
 * 1.事件绑定：把一个函数赋值给元素的某一个事件（此时函数属于创建，还没有执行呢）
 * 2.事件触发：当我们点击这个元素的时候，会把之前绑定的方法执行
 */
/*
tabList[0].onclick = function () {
    changeTab(0);
};
tabList[1].onclick = function () {
    changeTab(1);
};
tabList[2].onclick = function () {
    changeTab(2);
};
*/

//=>哇咔咔：不行
/*for (var i = 0; i < tabList.length; i++) {
    tabList[i].onclick = function () {
        changeTab(i);
    }
}*/

/*i=0 第一次循环
tabList[0].onclick = function () {
    "changeTab(i);" //=>绑定事件的时候，函数没有被执行呢，此时函数体中存储的都是“字符串”：我们看到的i只是一个字符而不是变量
}
i++ i=1 第二轮循环
tabList[1].onclick = function () {
    "changeTab(i);"  //=>点击第二个LI执行这个方法，此时开辟一个新的栈内存，把字符串变为代码执行 change(i)：此时的i已经是循环结束的3了
}
i++ i=2 第三轮循环
tabList[2].onclick = function () {
    "changeTab(i);"
}
i++ i=3 循环结束*/

//=>自定义属性解决方法：
//=>循环绑定事件之前，先把索引存储到自己的自定义属性上，后期点击需要用到的时候，直接到自定义属性上获取到索引即可
for (var i = 0; i < tabList.length; i++) {
    //tabList[i]:元数集合中的某一项(元素对象)
    tabList[i].myIndex = i;
    /*
     * [
     *   0:li {myIndex:0}
     *   1:li {myIndex:1}
     *   2:li {myIndex:2}
     *   length:3
     * ]
     */
    tabList[i].onclick = function () {
        changeTab(this.myIndex);//=>需要传递当前点击LI的索引,但是还不能使用I了 (this:当前点击的LI  this.myIndex： 从当前点击LI的自定义属性上获取到事先存储的索引)
    }
}

//=>基于LET处理
/*for (let i = 0; i < tabList.length; i++) {
    tabList[i].onclick = function () {
        changeTab(i);
    }
}*/

//=>基于闭包解决
/*for (var i = 0; i < tabList.length; i++) {
    tabList[i].onclick = (function (i) {
        return function () {
            changeTab(i);
        }
    })(i);
}*/

/*for (var i = 0; i < tabList.length; i++) {
    (function (i) {
        tabList[i].onclick = function () {
            changeTab(i);
        }
    })(i);
}*/

