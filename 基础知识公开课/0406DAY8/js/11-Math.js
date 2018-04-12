/*
var codeBox = document.getElementById('codeBox'),
    link = document.getElementById('link');
*/

/*function queryCode() {
    var codeArea = 'qwertyuiopasdfghjklzxcvbnm' +
        'QWERTYUIOPASDFGHJKLZXCVBNM' +
        '1234567890';
    var result = '';
    for (var i = 1; i <= 4; i++) {
        var n = Math.round(Math.random() * 61),
            char = codeArea.charAt(n);
        //=>生成四个不重复的
        //=>CHAR当前本次循环找到的字符,这个字符不一定是我们想要的,如果已经在RESULT中存在了,不要这个字符了,重新找
        if (result.indexOf(char) > -1) {
            i--;
            continue;
        }
        result += char;
    }
    return result;
}*/

var codeBox = document.getElementById('codeBox'),
    link = document.getElementById('link');

function queryCode() {
    var codeArea = 'qwertyuiopasdfghjklzxcvbnm' +
        'QWERTYUIOPASDFGHJKLZXCVBNM' +
        '1234567890';
    var result = '';
    while (result.length < 4) {
        var n = Math.round(Math.random() * 61),
            char = codeArea.charAt(n);
        if (result.indexOf(char) === -1) {
            result += char;
        }
    }
    return result;
}

codeBox.innerHTML = queryCode();
link.onclick = function () {
    codeBox.innerHTML = queryCode();
};