/*
 * 【思路】
 *   1. 给所有的LI绑定点击事件，当点击任何一个LI的时候，都做第二步操作
 *   2. 可以先让所有的LI&&DIV的class都为空（xxx.className=''），再让当前点击的这个LI和对应的DIV有ACTIVE这个样式类即可
 */
var tabBox = document.getElementById('tabBox');
var tabList = tabBox.getElementsByTagName('li');
var divList = tabBox.getElementsByTagName('div');

//=>封装一个方法完成页卡切换
function changeTab(n) {
    //=>N:形参变量,当执行这个方法的时候,会把当前点击的这个LI的索引传递过来

    //=>1.所有都没有选中样式
    for (var i = 0; i < tabList.length; i++) {
        tabList[i].className = '';
        divList[i].className = '';
    }
    //=>2.当前点击的有选中样式
    tabList[n].className = 'active';
    divList[n].className = 'active';
}

//=>自定义属性方式
for (var i = 0; i < tabList.length; i++) {
    //=>每一轮循环的时候，给每一个LI设置一个自定义属性“ZF-INDEX”，存储的值是各自的索引
    /*
     * TAB-LIST
     * {
     *   0:{zfIndex:0,...},
     *   1:{zfIndex:1,...},
     *   2:{zfIndex:2,...},
     *   length:3
     * }
     */
    tabList[i]['zfIndex'] = i;
    tabList[i].onclick = function () {
        //this:代表的是当前点击的这个LI
        changeTab(this.zfIndex);//=>需要索引
    }
}


//===>不行的代码
/*for (var i = 0; i < tabList.length; i++) {
    //tabList[i] <=>每一轮循环当前要操作的那个LI对象
    tabList[i].onclick = function () {
        //=>事件绑定:给当前元素的某一个事件绑定一个方法,绑定的时候方法没有执行(属于创建一个方法),当在页面中手动触发点击事件的时候绑定的方法才会执行
        alert(i);
        changeTab(i);//=>需要把当前点击的这个LI的索引传递进来
    }
}*/
/*i=0 第一次循环
tabList[0].onclick=function () {
  "changeTab(i);"
};
i++
i=1 第二次循环
tabList[1].onclick=function () {
  "changeTab(i);"  changeTab(i)
};
i++
i=2
tabList[2].onclick=function () {
    "changeTab(i);"
};
i++
i=3
循环结束*/

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






