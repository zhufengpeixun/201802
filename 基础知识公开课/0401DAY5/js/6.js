var ary = [12, 23, 34, 45];

//=>需求1：倒着输出
// itar [TAB]
// ary.length-1 当前数组的最大索引(属性名)
/*
for (var i = ary.length - 1; i >= 0; i--) {
    console.log(ary[i]);
}
*/

//=>需求2：输出奇数项 12 23
/*for (var i = 0; i < ary.length; i++) {
    //=>i=0 i是偶数 第一项 奇数项
    //=>i=1 i是奇数 第二项 偶数项
    //=>索引从零开始，所以索引为偶数，代表的是奇数项（如何确定一个数的奇偶:能被2整除的都是偶数）
    i % 2 === 0 ? console.log(ary[i]) : null;
}*/
for (var i = 0; i < ary.length; i += 2) {
    console.log(ary[i]);
}