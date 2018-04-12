var oBox = document.getElementById("box"),
    aList = oBox.getElementsByTagName('li');

/*
function changeColor() {
    for (var i = 0; i < aList.length; i++) {
        aList[i].style.backgroundColor = i % 3 == 0 ? 'lightblue' : ((i % 3 == 1) ? 'lightgreen' : 'lightpink');
    }
}

changeColor();*/

for (var i = 0; i < aList.length; i++) {
    var cur = aList[i];
    //0->false 1->true  2->true
    if (i % 3) {
        //1||2
        //1==true  2==true 需要把布尔转化能为数字再比较
        if (i % 3 == true) {
            //1
            cur.className = "bg1";
        } else {
            //2
            cur.className = "bg2";
        }
    } else {
        cur.className = "bg0";
    }
}
