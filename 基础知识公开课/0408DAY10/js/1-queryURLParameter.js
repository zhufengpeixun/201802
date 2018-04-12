/*
 * 目的：把一个URL地址问号传参部分（?）以及哈希值部分（#）截取出来，存放到一个对象中，以键值对的方式存储
 *
 * =>{
 *   lx:1,
 *   name:'AA',
 *   age:20,
 *   HASH:'teacher'
 * }
 */
var str = "http://www.zhufengpeixun.cn/stu?lx=1&name=AA&age=20#teacher";

//1.首先获取问号以及井号的索引,把问号后面的信息以及井号后面的信息分别获取到
var ASK = str.indexOf('?'),
    WELL = str.indexOf('#');
var strASK = str.substring(ASK + 1, WELL),//=>lx=1&name=AA&age=20
    strHASH = str.substring(WELL + 1);//=>teacher

//2.按照“&”把STR-ASK进行拆分（获取到一个数组）,依次遍历数组中的每一项,把每一项内容在按照“=”进行拆分，分别获取到我们的属性名和属性值即可
var aryASK = strASK.split('&'),//=>["lx=1", "name=AA", "age=20"]
    obj = {};
for (var i = 0; i < aryASK.length; i++) {
    var item = aryASK[i],//=>"lx=1" \ "name=AA"...
        itemAry = item.split('='),//=>["lx","1"]\["name","AA"]...
        key = itemAry[0],
        value = itemAry[1];
    obj[key] = value;
}
obj['HASH'] = strHASH;
console.log(obj);