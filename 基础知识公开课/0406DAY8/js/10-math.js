/*
 * 生成一个四位随机验证码
 * 
 * =>数字+字母 （简单）
 * =>找图片
 * =>滑动拼图
 * =>问答类
 * =>点击汉字拼成语
 * =>把倒着的文字或者图片正过来
 * =>...
 */
var codeBox = document.getElementById('codeBox'),
    link = document.getElementById('link');

//=>编写一个获取四位随机验证码的方法
function queryCode() {
    //1.准备验证码获取的范围（索引：0~61）
    var codeArea = 'qwertyuiopasdfghjklzxcvbnm' +
        'QWERTYUIOPASDFGHJKLZXCVBNM' +
        '1234567890';
    //2.我们只需要准备四个索引,即可在CODE-AREA中通过CHAR-AT方法获取到四个字符,把四个字符串拼接成一个字符串就是我们的验证码
    var result = '';
    for (var i = 0; i < 4; i++) {
        var n = Math.round(Math.random() * 61),//=>*(61-0)+0
            char = codeArea.charAt(n);
        result += char;
    }
    return result;
}

//=>开始加载页面（和点击LINK）需要生成一个验证码
codeBox.innerHTML = queryCode();//=>执行方法,把RETURN返回的四位验证码插入到CODE-BOX盒子中
link.onclick = function () {
    codeBox.innerHTML = queryCode();
};











