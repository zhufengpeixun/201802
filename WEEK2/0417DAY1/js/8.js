/*
 * 变量提升
 *   var ary;
 *   fn = aaafff000;
 *   var res;
 */
var ary = [1, 2, 3, 4];//=>ary=bbbfff111 [ARY全局变量]  [0,2,3,4]
function fn(ary) {
    /*
     * 形参赋值：ary=bbbfff111 [ARY是私有变量]
     */
    ary[0] = 0;
    ary = [0];//=>ary=bbbfff222  [0(100)]
    ary[0] = 100;
    return ary; //=>return bbbfff222
}
var res = fn(ary);//=>res=fn(bbbfff111)=bbbfff222
console.log(ary);//=>[0,2,3,4]
console.log(res);//=>[100]