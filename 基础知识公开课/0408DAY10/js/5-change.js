/*
 * 1.实现奇数偶数行变颜色
 *  ->让奇数行有 color0 的样式类
 *  ->让偶数行有 color1 的样式类
 *  ->xxx.className = 'xxx'
 *
 * 2.鼠标滑过高亮选中，离开回归原有的样式
 *  ->鼠标滑过让当前LI的CLASS='COLOR-ACTIVE'
 *  ->鼠标离开之前是什么样式类名,就回归到什么样式类名
 *
 * 3.点击每一个LI,弹出我是第N个LI
 */
var oBox = document.getElementById('box'),
    boxList = oBox.getElementsByTagName('li');
//=>遍历集合中的每一个LI，区分出当前遍历的LI是奇数还是偶数（索引是偶数，当前LI是奇数行，索引是奇数，当前LI是偶数行）
for (var i = 0; i < boxList.length; i++) {
    var item = boxList[i];
    //=>i%2===0：索引为偶数，代表是的奇数行，反之则为偶数行
    //i % 2 === 0 ? item.className = 'color0' : item.className = 'color1';
    //item.className = i % 2 === 0 ? 'color0' : 'color1';
    item.className = 'color' + (i % 2);

    //=>给每一个LI都设置自定义属性，存储索引和原有的样式类信息
    item.myIndex = i;
    item.myClass = item.className;

    //=>鼠标滑过和离开
    item.onmouseover = function () {
        //this:当前操作的这个LI
        this.className = 'colorActive';
    };
    item.onmouseout = function () {
        this.className = this.myClass;
    };

    //=>点击
    item.onclick = function () {
        alert("我是第" + (this.myIndex + 1) + "个LI");
    };
}








