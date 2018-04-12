var oBox = document.getElementById("box"),
    itemList = oBox.getElementsByTagName("li");

/*==利用CSS的优先级搞定：默认背景颜色基于样式类完成，鼠标滑过的样式比样式类优先级高一些即可（ID选择器/行内样式）==*/
/*for (var i = 0; i < itemList.length; i++) {
    itemList[i].className = 'bg' + (i % 3);//=>隔三行变色:修改元素的CLASS样式类
    /!*
     * 样式表
     *  ID选择器
     *  标签选择器
     *  样式类选择器
     * 行内样式
     *
     * 这些方式存在优先级的问题：行内、ID、样式类、标签...
     *!/
    itemList[i].onmouseover = function () {
        // this.style.background = 'yellow';
        // this:当前操作的LI
        this.id = 'hover';
    };
    itemList[i].onmouseout = function () {
        // this.style.background = '';
        this.id = '';
    };
}*/


/*for (var i = 0; i < itemList.length; i++) {
    itemList[i].className = 'bg' + (i % 3);//=>默认样式类改变背景色

    //=>在设置新样式之前，我们最好把原有的样式类保存起来
    /!*
     * this:当前操作的元素，也是一个元素对象，有很多的内置属性，我们设置一个自定义的属性，把原有的样式类信息存储进来
     *!/
    itemList[i].myOldClass = itemList[i].className;//=>在改变之前,把原有的样式类信息存储到自定义属性中

    //=>鼠标滑过也想基于样式类完成,不想修改行内样式
    itemList[i].onmouseover = function () {
        //=>滑过：简单粗暴的让CLASS等于HOVER
        this.className = 'hover';
    };
    itemList[i].onmouseout = function () {
        //=>离开：让其还原为原有的样式（原来的样式类可能是 BG0/BG1/BG2 ）
        this.className = this.myOldClass;
    };
}*/

for (var i = 0; i < itemList.length; i++) {
    itemList[i].className = itemList[i].myOldClass = 'bg' + (i % 3);
    itemList[i].onmouseover = function () {
        this.className = 'hover';
    };
    itemList[i].onmouseout = function () {
        this.className = this.myOldClass;
    };
}
