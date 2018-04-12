var oBox = document.getElementById("box"),
    itemList = oBox.getElementsByTagName("li");
for (var i = 0; i < itemList.length; i++) {
    itemList[i].className = 'bg' + (i % 3);

    //=>鼠标滑过：在原有样式类的基础上累加一个HOVER的样式类(由于HOVER在样式表中靠后，它的样式会覆盖原有BG中的样式)
    //=>鼠标离开：把新增的HOVER样式类移除掉即可
    itemList[i].onmouseover = function () {
        this.className += ' hover';
    };
    itemList[i].onmouseout = function () {
        //this.className -= ' hover';
        //this.className = 'bg0 hover' - ' hover';//=>这不是字符串相减，这是数学运算(NaN)
        this.className = this.className.replace('hover', '');
    };
}

//=>点击每一个LI弹出我是第N个LI