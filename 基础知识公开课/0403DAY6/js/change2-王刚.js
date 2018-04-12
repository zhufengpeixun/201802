var oBox = document.getElementById("box");
var itemList = oBox.getElementsByTagName("li");

/* 1 */
/*for (var i = 0; i < itemList.length; i++) {
    // var n=i % 3;
    switch (i % 3) {
        case 0:
            itemList[i].className = "bgColorRed";
            break;
        case 1:
            itemList[i].className = "bgColorGreen";
            break;
        case 2:
            itemList[i].className = "bgColorBlue";
            break;
    }
}*/

/* 2 */
/*
var colorArray = ["bgColorRed", "bgColorGreen", "bgColorBlue"];
for (var i = 0; i < itemList.length; i++) {
    /!*
     * i%3=0 "bgColorRed" colorArray[0]
     * i%3=1 "bgColorGreen" colorArray[1]
     * i%3=2 "bgColorBlue" colorArray[2]
     * ...
     * i%3的余数是多少,就是我们当前需要到数组中通过此索引找到的样式类,而这个样式类则是当前LI需要设置的class
     *!/
    itemList[i].className = colorArray[i % 3];
}*/

for (var i = 0; i < itemList.length; i++) {
    itemList[i].className = 'bg' + (i % 3);
}
