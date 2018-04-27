//=>JQ选择器：基于各种选择器创建一个JQ实例(JQ对象)
//1.selector 选择器的类型(一般都是字符串，但是支持函数或者元素对象)
//2.context 基于选择器获取元素时候指定的上下文（默认document）
//JQ对象：一个类数组结构(JQ实例)，这个类数组集合中包含了获取到的元素

// console.log($('.tabBox'));
/*
 * JQ对象（类数组）=>JQ实例
 *   0: div.tabBox
 *   length: 1
 *   context: document
 *   selector: '.tabBox'
 *
 *   __proto__:jQuery.prototype
 *      add
 *      ...
 *      __proto__:Object.prototype
 *         hasOwnProperty
 *         ...
 */

/*
 * 获取页面中的元素对象
 *   1.基于原生JS提供的属性和方法获取 =>"原生JS对象"
 *      可以调取使用内置的JS属性和方法
 *        className
 *        onclick
 *        ...
 *
 *   2.基于JQ选择器获取 =>"JQ对象"
 *      可以调取JQ原型上提供的属性和方法
 *        add
 *        find
 *        ...
 *
 *  把JQ对象和原生JS对象之间相互的转换
 *
 *   [把JQ->原生JS]
 *     JQ对象是一个类数组集合，集合中每个索引对应的都是原生JS对象，我们基于索引获取即可
 *     let $tabBox=$('.tabBox'); 变量名前面是以$开始的，一般代表基于JQ选择器获取的结果
 *     let tabBox=$tabBox[0];
 *         tabBox=$tabBox.get(0); //=>GET是JQ原型上提供的方法，供JQ实例基于索引获取到指定的JS对象
 *     $tabBox.eq(0):它也是基于索引获取集合中的某一项，只不过GET获取的是JS对象，EQ会把获取的结果包裹成一个新的JQ对象(JQ实例返回)
 *
 *  [把原生JS->JQ]
 *     let tabBox=document.querySelector('.tabBox');
 *     $(tabBox) 直接使用选择器把原生JS对象包裹起来，就会把JS转换为JQ对象（因为$()就是创建JQ的一个实例）
 *
 */
// let $tabBox = $('.tabBox');
// let tabBox = document.querySelector('.tabBox');

/*
 * 分析选择器源码，我们发现SELECTOR传递的值支持三种类型
 *   1.STRING ：基于选择器获取元素
 *   2.元素对象 selector.nodeType：  把JS对象转换为JQ对象
 *   3.函数：把传递的函数执行，把JQ当做实参传递给函数
 *     selector(jQuery)
 */
// $(function ($) {
//     //=>$:传递进来的jQuery
//
// });

// $ = '哈哈哈';
// // $();//=>Uncaught TypeError: $ is not a function
// jQuery(function ($) {
//     //=>$:私有变量,而且特定就是JQ
//     $();
// });

// jQuery(() => {
//     //=>函数肯定会执行，但是会在当前页面中的HTML结构都加载完成后再执行
//     //=>函数执行会形成一个闭包
// });

$(function () {
    //=>写自己的代码
});




