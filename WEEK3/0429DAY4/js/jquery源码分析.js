/*
let fn = function (window, noGlobal) {
    //=>noGlobal:undefined
};
(function (global, factory) {
    //=>factory:fn
    //=>global:window
    factory(global);//=>fn(window) 在浏览器环境中使用JQ
}(window, fn));
*/

/*
(function (window, noGlobal) {
    var jQuery = function (selector, context) {
        //=>执行jQuery方法：new jQuery.fn.init 创建INIT这个类的实例,把传递给JQ的参数原封不动的传递给了INIT这个类
        return new jQuery.fn.init(selector, context);//=>返回的是INIT这个类的实例   实例.__proto__===init.prototype===jQuery.prototype
    };
    window.jQuery = window.$ = jQuery;

    //=>jQuery.fn是JQ的原型
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        ...
    };

    var init = jQuery.fn.init = function (selector, context) {

    };
    init.prototype = jQuery.fn;
})();
*/

// $() <==> jQuery() ：创建JQ这个类的一个实例
// new jQuery();
//=>饶了一圈的目的即使把JQ像普通函数一样执行，但是返回的结果依然是这个类的一个实例

//=>JQ即是一个类也是一个对象
// $()创建它的一个实例，可以调取jQuery.fn/jQuery.prototype上的属性和方法：$().xxx()
// jQuery.xxx=xxx，这些是作为对象给JQ加的私有属性和访问，使用的时候：$.xxx()

//=>extend在对象和原型上都存在，但是是一个方法
// $.extend()
// $.fn.extend()  $.prototype.extend()
// $().extend()
// ...
/*jQuery.extend = jQuery.fn.extend = function () {
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;

        // skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {};
    }

// extend jQuery itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];

                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = jQuery.extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};*/

//=>向JQ对象上扩展属性和方法
// $.extend({
//     aa: function () {
//
//     }
// });
// $.aa();

//=>向JQ的原型上扩展属性和方法
// $.fn.extend({
//     bb:function(){
//
//     }
// });
// $().bb();

//================>关于JQ中的EACH
//=>JQ中的原型和对象上都提供了EACH方法，但是最后用的还是JQ对象上的EACH，JQ中的EACH本质上只有一个（对象中的EACH）
//=>$.each([obj],[function]) 遍历对象、数组、类数组中的每一项的，有点类似于数组内置方法forEach
// jQuery.prototype.each = function (callback, args) {
//     return jQuery.each(this, callback, args);
// };
// jQuery.extend({
//     each: function (obj, callback, args) {
//         //...
//     }
// });

// let $boxList = $('div');//=>基于JQ选择器获取的是一个类数组集合
// // $boxList.each(function(){}); //=> jQuery.each($boxList, function(){}); 遍历$boxList
// $.each($boxList, function (index, item) {
//     //=>当前类数组中有多少项，函数就被执行多少次
//     //index:当前这一次循环的索引
//     //item:当前循环这一次对应项的内容
//     //this:item
// });

// $.each([12,23,34], function (index, item) {
//     //index:0 1 2
//     //item:12 23 34
//     //this:12 23 34
// });

//=>JQ的选择器
// $(selector, context)
// selector:选择器类型
// context:获取元素的上下文,一般不写,默认DOCUMENT

// let $box = $('.box'); //=>如果SELECTOR是一个字符串,是基于类似于CSS选择器方式获取页面中的元素（结果是一个类数组集合 MAKE-ARRAY），当然这个类数组集合就是JQ类的一个实例
//=>JQ的实例不能调取内置JS中的属性和方法，如果想调取使用，需要把JQ对象转为JS对象
// $box[0]
// $box.get(0) //=>获取集合中的某一项，获取的结果是一个JS对象
// $box.eq(0) //=>获取集合中的某一项，获取的结果依然是JQ对象

// let box = document.querySelector('.box');//=>JS对象，不能直接使用JQ中提供的方法，需要使用，首先把它转换为JQ对象
// $(box) 即可转换为JQ对象

// $(function () {
//     //=>当HTML结构加载完成，就会执行这个函数
// });

//=>传递的是字符串：
//1.选择器：页面中已有HTML结构，我们在JS中基于JQ获取
//2.HTML字符串：页面中没有这个结构，我们创建一个这样的结构对象，类似于CREATE-ELEMENT

//================================
//JQ中常用的方法  http://jquery.cuishifeng.cn/
//1.原型  $().xxx()
/*
 * get / eq
 * children
 * find
 * filter
 * index
 * next / nextAll
 * prev / prevAll
 * siblings
 * parent
 * parents
 *
 * each
 *
 * css
 * addClass / removeClass  / toggleClass / hasClass
 *
 * attr / removeAttr
 * prop / removeProp
 *
 * animate
 * stop
 * finish
 *
 * html
 * val
 * text
 * append / appendTo
 * insertBefore
 * insertAfter
 *
 * width / height
 * innerWidth / innerHeight
 * outerWidth / outerHeight
 * scrollTop / scrollLeft
 */

//2.对象 $.xxx()
/*
 * 检测数据类型的
 * isArray
 * isFunction
 * ...
 *
 * ajax
 *
 * toArray
 * toJSON
 * ...
 */














