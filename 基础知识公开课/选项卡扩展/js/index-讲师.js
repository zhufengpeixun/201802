/*
 * 思路：不管点击的是哪一个LI，我们首先把所有的LI及DIV的选中样式清空，再让当前点击的这个LI及DIV有选中的样式
 */
var oTab = document.getElementById('tab'),
    tabList = oTab.getElementsByTagName('li'),
    divList = oTab.getElementsByTagName('div');

/*function changeTab(curIndex) {
    //curIndex:current index 存储的是当前点击这个LI的索引
    for (var i = 0; i < tabList.length; i++) {
        tabList[i].className = divList[i].className = '';
    }
    tabList[curIndex].className = divList[curIndex].className = 'active';
}*/

/*
for (var i = 0; i < tabList.length; i++) {
    tabList[i].myIndex = i;//=>每一次循环的时候，都给每一个LI设置一个自定义属性MY-INDEX，属性值存储的是当前LI的索引
    /!*
     * [
     *   0:第一个LI  {myIndex:0...}
     *   1:第二个LI  {myIndex:1...}
     *   2:第三个LI  {myIndex:2...}
     *   length:3
     * ]
     *!/
    tabList[i].onmouseover = function () {
        // changeTab(i);//=>此处的I不是当前滑过这个LI的索引(原因：绑定方法的时候，方法还没有执行，存储的是字符串“changeTab(i);”，当循环结束[i=3]，我们手动去操作LI的时候，方法才会执行，此时changeTab(i)中的变量i已经是循环后的3了)
        changeTab(this.myIndex);
    }
}*/

for (var i = 0; i < tabList.length; i++) {
    tabList[i].myIndex = i;
    tabList[i].onmouseover = function () {
        //=>清空所有
        for (var j = 0; j < tabList.length; j++) {
            tabList[j].className = divList[j].className = '';
        }
        //=>当前有选中
        this.className = 'active';
        divList[this.myIndex].className = 'active';
    }
}