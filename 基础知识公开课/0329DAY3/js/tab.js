var tabBox = document.getElementById('tabBox');
var tabList = tabBox.getElementsByTagName('li');
var divList = tabBox.getElementsByTagName('div');

function changeTab(n) {
    for (var i = 0; i < tabList.length; i++) {
        tabList[i].className = '';
        divList[i].className = '';
    }
    tabList[n].className = 'active';
    divList[n].className = 'active';
}


/*for (let i = 0; i < tabList.length; i++) {
    tabList[i].onclick = function () {
        changeTab(i);
    }
}*/

/*for (var i = 0; i < tabList.length; i++) {
    ~function (i) {
        tabList[i].onclick = function () {
            changeTab(i);
        }
    }(i);
}*/

/*for (var i = 0; i < tabList.length; i++) {
    tabList[i].onclick = function (i) {
        return function () {
            changeTab(i);
        }
    }(i);
}*/


/*
 * 课后作业：
 *   1.回去后想出N多种实现选项卡的思路
 *
 *   2.隔行变色实现间隔三行变色,并且基于JS实现出鼠标滑过高量显示，鼠标离开回归原有样式
 */


