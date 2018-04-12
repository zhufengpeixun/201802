/*
 * 1.把原有时间字符串中的 年\月\日\时\分\秒 都得到
 *  ->先按照空格拆
 *  ->左边按照斜杠拆，右边按招冒号拆
 *  ->split
 *
 * 2.拼接成我们自己想要的格式即可
 */
var str = "2018/4/6 12:48:6"; //=>"04-06 12:48"

/*
var ary = str.split(' '),//=>["2018/4/6", "12:48:6"]
    aryLeft = ary[0].split('/'),//=>["2018", "4", "6"]
    aryRight = ary[1].split(':');//=>["12", "48", "6"]
ary = aryLeft.concat(aryRight);//=>["2018", "4", "6", "12", "48", "6"]
*/
var ary = str.split(/(?:\/| |:)/g);//=>["2018", "4", "6", "12", "48", "6"]
var res = addZero(ary[1]) + '-' + addZero(ary[2]) + ' ' + addZero(ary[3]) + ':' + addZero(ary[4]);
console.log(res);

//=>不足十位补零
function addZero(val) {
    return val < 10 ? '0' + val : val;
}

