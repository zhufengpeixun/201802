var licensePlate = document.getElementById('licensePlate'),
    shakeBtn = document.getElementById('shakeBtn');

/*
 * 1.先在京?中选取一个
 * 2.在26个大写字母和10个数字中选取五个
 * 3.拼在一起即可
 */
function queryPlate() {
    var result = "京",
        area1 = "ABCEFGHJK",//=>0~8
        area2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";//=>0~35
    //=>先把第一部分“京？”搞定
    var n = Math.round(Math.random() * 8),
        char1 = area1.charAt(n);
    result += char1;

    //=>再把第二部分五个车牌搞定
    for (var i = 0; i < 5; i++) {
        var m = Math.round(Math.random() * 35),
            char2 = area2.charAt(m);
        result += char2;
    }
    return result;
}

/*
 * 点击摇号按钮，执行QUERY-PLATE方法，把生成的车牌号插入到P标签中即可（摇号按钮只能点击三次）
 */
var count = 0;
shakeBtn.onclick = function () {
    //=>点击一次,我们就让COUNT累加1,如果COUNT已经超过3,提示已经达到上限
    count++;
    if (count > 3) {
        alert("最多只能摇三次！！");
        return;//=>函数体中遇到RETURN代码将不再执行
    }
    licensePlate.innerHTML = queryPlate();
};