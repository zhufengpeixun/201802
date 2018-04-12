var oDiv = document.getElementById('box');
/*
 * 1. 我们获取的元素是对象数据类型值（元素对象）
 *   typeof oDiv =>"object"
 *
 * 2. 元素对象中有很多内置的键值对，我们也可以设置一些自己的键值对（自定义属性）
 *   oDiv.myName = 'hello world!';
 *   oDiv['myAga'] = 100;
 *
 *   className：""  存储当前元素的样式类信息(STRING)
 *   id："box"  存储当前元素的ID(STRING)
 *
 *   innerHTML / innerText：都是获取当前元素里面的内容，innerHTML可以识别出HTML标签，而innerText只能识别文本
 *
 *   onclick / onmouseover / onmouseout：事件属性
 *
 *   style：存储的是当前元素所有“写在行内上的”样式信息(OBJECT)，一定是写在行内的，写在样式表中的，STYLE中无法获取（基于STYLE设置样式，也是设置在行内上）
 */
// oDiv.innerHTML = "<h1>珠峰培训</h1>";
// oDiv.innerText = "<h1>珠峰培训</h1>";
//=>两个操作都是在给元素插入内容,第一个可以识别出HTML标签,第二个会把标签也当做文本插入，项目中常用的是innerHTML

// console.log(oDiv.style.height, oDiv.style.color);//=>"" "red"，HEIGHT是写在样式表中的，我们无法基于STYLE获取
// oDiv.style.backgroundColor = 'pink';

//===============
var oItem = document.getElementById('item');
var itemList = oItem.getElementsByTagName('li');
/*
 * 1、获取的元素集合也是一个对象数据类型，而且和数组非常相似（数字作为属性名[索引]，从零开始递增，有一个length属性存储长度），但是它不是数组，我们称它为“类数组”
 *
 * 2、集合中的每一项都是一个单独的元数对象
 */
itemList[0].style.color = 'red';
console.dir(itemList);