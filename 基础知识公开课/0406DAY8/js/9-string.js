/*
 * URL地址包含很多部分
 *   问号后面的是地址参数
 *   井号后面的是哈希值(HASH)
 *
 *   {
 *     name:'aa',
 *     age:20,
 *     sex:0
 *   }
 *   #后面的HASH值可能有可能没有
 */
var str = 'http://www.zhufengpeixun.cn/stu/?name=aa&age=20&sex=0#teacher';
/*
 * 1.分别获取问号和井号的索引
 * 2.从问号后面开始截取字符串（如果有#，截取到#的前面，没有#截取到字符串的末尾）
 * =>name=aa&age=20&sex=0
 * 3.在按照&拆成三部分
 * ['name=aa','age=20','sex=0']
 * 4.依次遍历数组中的每一项，把每一项按照“=”在进行拆分
 *   拆出来的第一部分是对象的属性名
 *   第二部分是对象的属性值
 */

var indexASK = str.indexOf('?'),
    indexWELL = str.indexOf('#');
/*if (indexWELL > -1) {//=>有#
    str = str.substring(indexASK + 1, indexWELL);
} else {
    str = str.substring(indexASK + 1);
}*/
indexWELL === -1 ? indexWELL = str.length : null;
str = str.substring(indexASK + 1, indexWELL);
//=>"name=aa&age=20&sex=0"
var ary = str.split('&'),//=>["name=aa", "age=20", "sex=0"]
    obj = {};
for (var i = 0; i < ary.length; i++) {
    var item = ary[i],
        itemAry = item.split('=');//=>["name","aa"] / ["age",20]...
    var key = itemAry[0],
        value = itemAry[1];
    obj[key] = value;
}
console.log(obj);


