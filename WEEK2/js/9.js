/*
/!*
 * 变量提升
 *   fn = AAAFFF000
 *   var f;
 *!/
function fn(i) {
    /!*
     * 第一次FN执行
     *   i = 10 (11) (12)
     *
     * return BBBFFF111 （返回的小函数）
     *!/

    /!*
     * 第二次执行FN
     *   i=20 (21)
     * return BBBFFF222;
     *!/
    return function (n) {
        /!*
         * 第一次执行F(20)
         *   n=20
         * 20+(i++)  不管是否加小括号都是先算20+i =>30
         *!/

        /!*
         * 第二次执行小函数(40)
         *    n=40
         * 40+20++ =>60
         *!/

        /!*
         * BBBFFF111的第二次执行(30)
         *    n=30
         * 30+i++   =>41
         *!/
        console.log(n + (i++));
    }
}
var f = fn(10);//=> f=fn(10)=BBBFFF111
f(20);//=>30
fn(20)(40);//=>60
fn(30)(50);//=>80
f(30);//=>41*/

var i = 10;
function fn() {
    return function (n) {
        console.log(n + (++i));
    }
}
var f = fn();
f(20);//=>31
fn()(20);//=>32
fn()(30);//=>43
f(30);//=>44
