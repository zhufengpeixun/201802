var oTab = document.getElementById('tab'),
    tabList = oTab.getElementsByTagName('li'),
    divList = oTab.getElementsByTagName('div');

//=>1.传递对象
for (var i = 0; i < tabList.length; i++) {
    tabList[i].onclick = function () {
        tabChange1(this);
    }
}

function tabChange1(ele) {
    for (var j = 0; j < tabList.length; j++) {
        //=>如果当前循环的LI和传递进来点击的那个元素相同，说明当前循环的这个LI就是被点击的，让其有选中样式
        if(tabList[j] === ele){
            tabList[j].className = "active";
            divList[j].className = "active";
            continue;
        }
        //=>不相等，则不是被点击的，我们取消选中样式即可
        tabList[j].className = "";
        divList[j].className = "";
    }
}

