function fn1() {
    console.log(1);
}

function fn2() {
    console.log(2);
}

fn1.call(fn2);
/*
 * CALL中的THIS是FN1，把FN1中的THIS关键字修改为FN2，然后再把FN1执行  =>"CALL方法中的THIS是谁，最后执行的就是谁"
 */
fn1.call.call(fn2);
/*
 * 第一次执行最末尾的CALL，CALL中的THIS是FN1.CALL，先把FN1.CALL中的THIS改为FN2，然后让FN1.CALL执行
 * 第二次CALL执行，方法中的THIS已经被上一次修改为FN2了，所以参考“THIS是谁就执行谁”的标准，执行的是FN2
 */