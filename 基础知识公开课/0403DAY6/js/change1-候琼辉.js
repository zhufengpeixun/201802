var oBox = document.getElementById('box');
var ulList = oBox.getElementsByTagName('li');

for (var i = 0; i < ulList.length; i++) {
    /*
     * i=0 第一个li i%3=0
     * i=1 第二个li i%3=1
     * i=2 第三个li i%3=2
     * i=3 第四个li i%3=0
     * ...
     */
    var n = i % 3,//=>当前LI的索引模3的余数
        liColor = ulList[i];//=>当前循环找出来的那个LI
    if (n === 0) {
        liColor.style.backgroundColor = 'red';
    } else if (n === 1) {
        liColor.style.backgroundColor = 'yellow';
    } else {
        liColor.style.backgroundColor = 'pink';
    }
}