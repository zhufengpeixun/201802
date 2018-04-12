/*
 * 在FOR循环的循环体中，经常出现两个常用的关键字：
 *   1. continue：继续
 *   2. break：中断或者结束
 */
/*
for (var i = 0; i < 10; i++) {
    if (i < 5) {
        i++;
        continue;//=>结束本轮循环（循环体中continue后面代码将不再执行），继续执行下一轮循环
    }
    if (i > 7) {
        i += 2;
        break;//=>强制结束整个循环，不做任何的处理
    }
    i += 1;
}*/

for (var i = 1; i <= 10; i += 2) {
    if (i <= 5) {
        i++;
        continue;
    } else {
        i -= 2;
        break;
    }
    i--;
    console.log(i);
}
console.log(i);//=>5