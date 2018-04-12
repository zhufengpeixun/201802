// var time = "2018-04-08"; //=>TARGET："2018/04/08"

//=>第一种思路：先按照“-”拆成三部分，在把三部分按照“/”拼成字符串
/*
var timeAry = time.split('-');//=>["2018", "04", "08"]
var result = timeAry.join('/');//=>"2018/04/08"
*/

//=>第二种思路：直接替换即可
/*
time = time.replace('-', '/').replace('-', '/');
console.log(time);//=>"2018/04/08"
*/

var time = "2018-4-8 10:5:20";//=>TARGET："04/08 10:05"

//1.获取当前字符串中对应的六个信息值
var timeAry = time.split(' '),//=>["2018-4-8", "10:5:20"]
    aryLeft = timeAry[0].split('-'),//=>["2018", "4", "8"]
    aryRight = timeAry[1].split(':');//=>["10", "5", "20"]
time = aryLeft.concat(aryRight);//=>["2018", "4", "8", "10", "5", "20"]

//2.在获取的六个信息值中找到自己需要的值(补零),拼接成自己想要的字符串
var result = addZero(time[1]) + "/" + addZero(time[2]) + " " + addZero(time[3]) + ":" + addZero(time[4]);

function addZero(val) {
    return val < 10 ? '0' + val : val;
}