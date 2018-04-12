var oTab = document.getElementById('tab'),
    tabList = oTab.getElementsByTagName('li'),
    divList = oTab.getElementsByTagName('div');

var lastIndex = 0;
for (var i = 0; i < tabList.length; i++) {
    tabList[i]._index = i;//=>_index等价于myIndex
    tabList[i].onclick = function () {
        if (this._index === lastIndex) return;//=>如果当前点击的索引和上一次索引相同（点击的就是上一个被选中的），我们不做任何事情

        //=>清空上一次
        tabList[lastIndex].className = "";
        divList[lastIndex].className = "";

        //=>当前的有选中样式
        this.className = "active";
        divList[this._index].className = "active";

        //=>修改LAST-INDEX值，让当前本选中的索引作为下一次点击要清除的上一次的索引
        lastIndex = this._index;
    }
}