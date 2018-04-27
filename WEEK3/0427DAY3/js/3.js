/*
 * JQ选择器的SELECTOR可以是字符串，字符串这种格式也有两种
 *   1.选择器
 *   2.HTML字符串拼接的结构：把拼接好的HTML字符串转换为JQ对象，然后可以基于APPEND-TO等方法追加到页面中
 */
// $('<div id="AA"></div>').appendTo(document.body);

/*
 * EACH：JQ中的EACH方法是用来进行遍历的（类似于数组的FOR-EACH）
 *   [可遍历内容]
 *     1.数组
 *     2.对象
*      3.类数组(JQ对象)
 *     ...
 *   [三种EACH]
 *     1.给JQUERY设置的私有属性  $.each()
 *     2.给实例设置的公有属性 $([selector]).each()
 *     3.内置的EACH
 */
// $.each([12, 23, 34], (index, item) => {
//     //=>参数的顺序和内置FOR-EACH相反
//     console.log(index, item);
// });

// $.each({name: 'xxx', age: 25, 0: 100}, (key, value) => {
//     //=>原理其实就是FOR-IN循环
//     console.log(key, value);
// });

// $('.tabBox li').each(function (index, item) {
//     //=>非箭头函数：THIS===ITEM，当前遍历的这一项 （原生JS对象）
//     //=>$(THIS)把当前遍历的这一项转换为JQ对象
//     $(this).click(function () {
//         //=>给每一个遍历的LI都绑定一个点击事件
//         //THIS:当前点击的LI（原生JS对象）
//         $(this).css({
//             color: 'red'
//         });
//     });
// });


// $('.tabBox li').click(function () {
//     //=>获取的JQ集合中有三个，我们此处相当于给三个LI都绑定了点击事件（JQ在调取CLICK的时候，会默认的把集合进行EACH遍历，把每一项都给CLICK了）
// });
// $('.tabBox li').css({
//     color: 'green'
// });

// jQuery.noConflict();//=>转让JQ使用$的权利
// console.log($);//=>UNDEFINED
// jQuery();

// let zzz = jQuery.noConflict(true);//=>深度转让:把jQuery这个名字也让出去，返回结果赋值给一个变量，此时这个变量是新的JQ代言人
// console.log(jQuery);//=>UNDEFINED
// console.log(zzz);


// $.ajax({
//     url: 'json/product.json',
//     method: 'GET',
//     dataType: 'json',
//     async: false,
//     success: function (result) {
//         console.log(result);
//     }
// });

//=>常用的筛选方法：
// filter：同级筛选
// children：子集筛选
// find：后代筛选

