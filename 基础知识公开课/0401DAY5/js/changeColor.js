var oBox = document.getElementById('box'),
    boxList = oBox.getElementsByTagName('li');
for (var i = 0; i < boxList.length; i++) {
    // boxList[i]
    // i=0  第一次循环 boxList[0]  0 第一行
    // i=1  第二次循环 boxList[1]  1 第二行 (偶数行=>索引是奇数)
    // ...
    // i % 2 !== 0 ? boxList[i].style.backgroundColor = 'lightblue' : null;
    boxList[i].style.backgroundColor = i % 2 !== 0 ? 'lightpink' : ''; //=>会把三元运算符的结果赋值给等号左边的内容
}

//思考题：
//=>回去后自己扩展一下，实现每隔三行变色；鼠标滑过高量显示，鼠标离开回归原有颜色；