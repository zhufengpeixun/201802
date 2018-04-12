var oBox = document.getElementById('box'),
    liList = oBox.getElementsByTagName('li');
var max = liList.length - 1;
for (var i = 0; i < liList.length; i += 3) {
    //=>我们每一组循环一次，在循环体中，我们把当前这一组的样式都设置好即可（可能出现当前这一组不够三个,这样会报错）
    liList[i].style.background = '#46aa55';
    i + 1 <= max ? liList[i + 1].style.background = '#aa6053' : null;
    i + 2 <= max ? liList[i + 2].style.background = '#5477aa' : null;
}

/*
 * 三种方案
 *  1.依次遍历每一个LI，通过索引除以3取余数，让当前的LI有不同的背景色
 *  2.第一种的技巧，告别一个个的判断，直接采用数组或者直接找对应样式的方式来完成
 *  3.不是遍历每一个LI,而是遍历每一组
 */