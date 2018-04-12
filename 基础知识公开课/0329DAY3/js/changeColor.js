//=>1、获取BOX中所有的LI(我们需要先获取BOX)

var oBox = document.getElementById('box');

//=>想要修改BOX的样式
//1.通过STYLE修改行内样式
// oBox.style.backgroundColor = 'pink';

//2.基于CLASS-NAME属性修改BOX的样式类，从而改变样式
// oBox['className'] = 'box bgColor';
// oBox['className'] += ' bgColor';

var boxList = oBox.getElementsByTagName('li');


//=>2、搞个循环来完成我们的样式赋值
/*for (var i = 0; i < boxList.length; i++) {
    //=>索引是奇数代表偶数行
    if (i % 2 !== 0) {
        // boxList[i].style.backgroundColor = 'pink';
        boxList[i].className += ' bgColor';
    }
}*/

for (var i = 1; i < boxList.length; i += 2) {
    boxList[i].style.backgroundColor = 'lightblue';
}

//=>回去后实现隔三行变色