var ary = [12, 23, 34];

//=>输出每一项：倒着输出  34 23 12
//=>ary.length-1：当前数组中最后一项的属性名(索引)
/*
for (var i = ary.length - 1; i >= 0; i--) {
    console.log(ary[i]);
}
*/

//=>输出数组中的内容：输出奇数项的内容
/*for (var i = 0; i < ary.length; i++) {
    /!*i=0 第一项 奇数项
    i=1 第二项 偶数项
    i=2 第三项 奇数项
    索引为偶数，代表的是奇数项,如何判断当前i的值是奇数还是偶数？
    12%5:%称为模，用12除以5去余数*!/
    if (i % 2 === 0) {
        console.log(ary[i]);
    }
}*/
for (var i = 0; i < ary.length; i += 2) {
    console.log(ary[i]);
}