/*
 * 操作DOM的属性和方法
 *   [获取元素或者元素集合]
 *    getElementById
 *      ->上下文只能是document（只有document这个实例的原型链上才能找到这个方法，其它实例都找不到）
 *      ->ID重复了获取第一个
 *      ->IE6~7中会把表单元素的name当做id使用
 *    getElementsByTagName
 *      ->获取当前上下文中，所有子子孙孙中标签名叫做XXX的元素
 *    getElementsByClassName
 *      ->IE6~8中不兼容
 *    getElementsByName
 *      ->在IE浏览器中只对表单元素的name起作用
 *      ->上下文也只能是document
 *    querySelector
 *    querySelectorAll
 *      ->不兼容IE6~8
 *      ->没有DOM映射
 *    document.documentElement
 *    document.body
 *    document.head
 *    ...
 *
 *   [描述节点和节点之间关系的属性]
 *          nodeType nodeName  nodeValue
 *     元素节点  1  大写标签名  null
 *     文本节点  3  #text     文本内容
 *     注释节点  8  #comment  注释内容
 *     文档节点  9  #document null
 *
 *   childNodes：所有子节点
 *   children：所有元素子节点（IE6~8中会把注释当做元素节点）
 *   parentNode
 *   previousSibling / previousElementSibling
 *   nextSibling
 *   firstChild
 *   lastChild
 *
 *   [动态操作DOM]
 *     createElement
 *     createDocumentFragment
 *     appendChild
 *     insertBefore
 *     cloneNode(true/false)
 *     removeChild
 *     set/get/removeAttribute
 *
 *   [散]
 *     xxx.style.xxx=xxx  设置行内样式
 *     =>xxx.style.xxx  获取行内样式
 *
 *     xxx.className='xxx'
 *
 *     xxx.onclick=function...
 *
 *     ...
 */

/*
 * JS盒子模型属性
 *   =>在JS中通过相关的属性可以获取(设置)元素的样式信息,这些属性就是盒子模型属性（基本上都是有关于样式的）
 *
 *   client
 *      top
 *      left
 *      width
 *      height
 *
 *   offset
 *      top
 *      left
 *      width
 *      height
 *      parent
 *
 *   scroll
 *      top
 *      left
 *      width
 *      height
 */

//=>clientTop/Left/Width/Height
//1.clientWidth & clientHeight：获取当前元素可视区域的宽高（内容的宽高+左右/上下PADDING）
//=>和内容是否有溢出无关（和是否设置了OVERFLOW:HIDDEN也无关），就是我们自己设定的内容的宽高+PADDING

//=>获取当前页面一屏幕(可视区域)的宽度和高度
// document.documentElement.clientWidth || document.body.clientWidth
// document.documentElement.clientHeight || document.body.clientHeight

//2.clientTop & clientLeft：获取(上/左)边框的宽度

//3.offsetWidth & offsetHeight：在client的基础上加上border（和内容是否溢出也没有关系）

//4、scrollWidth & scrollHeight：真实内容的宽高（不一定是自己设定的值，因为可能会存在内容溢出，有内容溢出的情况下，需要把溢出的内容也算上）+ 左/上PADDING，而且是一个约等于的值 （没有内容溢出和CLIENT一样）
//=>在不同浏览器中，或者是否设置了OVERFLOW:HIDDEN都会对最后的结果产生影响，所以这个值仅仅做参考，属于约等于的值

//=>获取当前页面的真实宽高（包含溢出的部分）
// document.documentElement.scrollWidth || document.body.scrollWidth
// document.documentElement.scrollHeight || document.body.scrollHeight

//=============================
//=>通过JS盒模型属性获取值的特点
//1.获取的都是数字不带单位
//2.获取的都是整数，不会出现小数（一般都会四舍五入，尤其是获取的 偏移量）
//3.获取的结果都是复合样式值（好几个元素的样式组合在一起的值），如果只想获取单一样式值（例如：只想获取PADDING），我们的盒子模型属性就操作不了了（这不能说没有用，真实项目中，有时候我们就是需要获取组合的值来完成一些操作）

//===========[获取元素具体的某个样式值]
//1.[元素].style.xxx 操作获取
//> 只能获取所有写在元素行内上的样式(不写在行内上,不管你写没写都获取不到,真实项目中我们很少会把样式写在行内上)
//=>outer.style.width =>'' (width是写在样式表中的)

//2.获取当前元素所有经过浏览器计算的样式
//> 经过计算的样式：只要当前元素可以在页面中呈现（或者浏览器渲染它了），那么它的样式都是被计算过的
//=>不管当前样式写在哪
//=>不管你是否写了(浏览器会给元素设置一些默认样式)
/*
 * 标准浏览器(IE9+)
 *   window.getComputedStyle([元素],[伪类,一般都写null]) 获取到当前元素所有被浏览器计算过的样式(对象)
 *
 * IE6~8
 *   [元素].currentStyle 获取经过计算的样式
 */

/*
 * getCss：获取当前元素某一个样式属性值
 *
 * @param
 *    curEle[object]：当前要操作的元素
 *    attr[string]：当前要获取的样式属性名
 *
 * @return
 *    获取的样式属性值
 */
let getCss = function getCss(curEle, attr) {
    if ('getComputedStyle' in window) {
        let val = window.getComputedStyle(curEle, null)[attr];
        //=>把获取的结果去除单位（不是所有的值都能去单位的，例如：display\一些复合值都去不掉单位），只有符合 数字+单位 这种模式的结果才能基于PARSE-FLOAT去单位
        let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    }
    //=>throw new SyntaxError：抛出一个错误(语法错误),让浏览器崩溃,不在继续执行JS
    throw new SyntaxError('您的浏览器版本过低，请升级到最新版本，谢谢配合！！');
};
console.log(getCss(outer, 'width'));














