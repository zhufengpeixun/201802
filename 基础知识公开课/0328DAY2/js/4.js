var num = '10';
if (num == 10) {
    num++;
} else if (num == 5) {
    num--;
} else {
    num = 0;
}
console.log(num);//=>11

/*
//=>n++ 和 n=n+1 一样吗？
var n = '10';
// n = n + 1;//=>属于字符串拼接，结果是 '101'
n++;//=>此时这种写法还是数学运算，不是字符串拼接，结果是 11
console.log(n);
*/
