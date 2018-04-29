/*
 * CSS中的盒子模型
 *   1.一个盒子的WIDTH/HEIGHT/PADDING/BORDER/MARGIN...样式属性构成一个盒子模型
 *
 *   [传统]
 *     WIDTH/HEIGHT: 内容的宽度和高度（盒子的宽度高度是内容+填充+边框）
 *
 *   [CSS3]
 *     BOX-SIZING:BORDER-BOX
 *     WIDTH/HEIGHT:一个盒子的最终宽高，我们调整PADDING/BORDER，盒子大小不变，会自动的缩减内容的宽度和高度
 *
 *  JS中的盒子模型
 *    1.基于一些属性和方法获取到当前元素的相关样式
 *      CLIENT(WIDTH/HEIGHT/TOP/LEFT)
 *      OFFSET(WIDTH/HEIGHT/TOP/LEFT/PARENT)
 *      SCROLL(WIDTH/HEIGHT/TOP/LEFT)
 */

//=======================================
//=>CLIENT系列
//1.CLIENT(WIDTH/HEIGHT) 内容的宽高+PADDING，代表当前盒子可视区域的宽高 “对于浏览器来说，可视区域其实就是一屏幕的宽度和高度”
//获取当前浏览器一屏幕的宽度高度（兼容所有浏览器）
// document.documentElement.clientWidth || document.body.clientWidth
// document.documentElement.clientHeight || document.body.clientHeight
//2.CLIENT(TOP/LEFT) 盒子边框的宽度(上/左)

//========================================
//=>OFFSET系列
//OFFSET(WIDTH/HEIGHT)：在CLIENT的基础上加上BORDER（内容宽高+PADDING+BORDER）
//注意：当我们设置了固定的宽高，不管内容是否溢出，对宽高都不会有影响，所以CLIENT \ OFFSET 获取的结果不受内容是否溢出的影响

//=========================================
//=>SCROLL(WIDTH/HEIGHT)：真实内容的宽高(包含溢出部分的内容)+左或者上PADDING，当内容没有溢出的情况下和CLIENT相同
//基于这个属性获取的值每个浏览器都不太一样，而且同一个浏览器设置了OVERFLOW：HIDDEN也会对结果产生影响（这个值是一个参考值）
//=>获取当前页面真实的高度
// document.documentElement.scrollHeight||document.body.scrollHeight

//==================================
//=>刚才学习的8个属性具备一些特点：
//1.获取的结果是一个数字(没有单位)
//2.获取的结果是几个样式组合到一起的值（局限性：我只想获取宽高或者PADDING就不能基于这几个属性完成了）
//3.获取的结果都是整数（一般情况下会自己进行小数的四舍五入）

//=>需求：只想获取WIDTH（获取当前元素具体的某个样式属性的值）
// getComputedStyle
// 在IE6~8中没有这个方法，需要使用 xxx.currentStyle 这个属性获取

//=>window.getComputedStyle([元素],[元素伪类，一般都是不写或者写NULL]) 结果是一个对象，包含当前元素所有经过浏览器计算的样式属性和值（只要当前元素可以在页面中呈现，都是被浏览器计算过的），有些样式属性是我们自己设定的，还有很多都是浏览器的默认样式值

//=>GET-CSS：获取某一个元素对象指定的样式属性值
//ELE:元素对象
//ATTR:元素的样式属性名(字符串格式)
let getCss = function (ele, attr) {
    let val = null;
    //=>验证是否兼容:不兼容WIN中没有这个属性(属性值是UNDEFINED)
    //if(typeof window.getComputedStyle !== 'undefined')
    //if(window.getComputedStyle)
    if ('getComputedStyle' in window) {
        val = window.getComputedStyle(ele)[attr];

        //=>把获取的结果去除单位（只有符合 纯数字或者数字加单位的 两种字符串我们再基于PARSE-FLOAT去掉单位即可）
        let reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/i;
        reg.test(val) ? val = parseFloat(val) : null;
    }
    return val;
};

//=>SET-CSS：设置当前元素某一个样式属性的具体值
//ELE:元素对象
//ATTR:元素的样式属性名(字符串格式)
//VALUE:设置的值
let setCss = function (ele, attr, value) {
    //=>对于某些样式属性，如果传递的值没有单位，我们手动增加PX单位
    //1.传递的需要是数字才有可能加单位
    //2.对于Z-INDEX/OPACITY等样式属性，属性值就是数字，不须要加单位
    // if (!isNaN(value)) {//=>传递的是有效数字(纯数字字符串)
    //     if (!/^(zIndex|opacity)$/i.test(attr)) {//=>操作的样式或属性不是层级和透明度两个
    //         value += 'px';
    //     }
    // }
    !isNaN(value) && !/^(zIndex|opacity)$/i.test(attr) ? value += 'px' : null;
    ele['style'][attr] = value;
    //=>在JS中给元素设置样式只有两种
    //1.xxx.className=xxx 设置样式类(前提已经把样式写在样式类中了)
    //2.xxx.style.xxx=xxx 给元素设置行内样式值
};

//=>SET-GROUP-CSS：给当前元素批量设置样式
//ELE:元素对象
//OPTIONS:给当前元素需要设置的样式对象
//批量设置也是迭代样式对象，有几个样式属性我们就分别调取SET-CSS几次，给其设置样式
let setGroupCss = function (ele, options) {
    //=>迭代对象使用FOR-IN循环
    for (let key in options) {
        //=>OPTIONS对象中有多少组键值对，循环就执行几次，每一次KEY是当前迭代的属性名，OPTIONS[KEY]就是每一次迭代的属性值
        // KEY:background / opacity
        // OPTIONS[KEY]:'lightblue' / 0.2
        if (options.hasOwnProperty(key)) {
            setCss(ele, key, options[key]);
        }
    }
};

/*Object.prototype.AA = 100;
let obj = {name: 'xxx', 1: 1, age: 25, 0: 0};//=>obj.__proto__===Object.prototype
for (let key in obj) {
    /!*
     * 1.有多少组键值对就迭代多少次(可以使用BREAK/CONTINUE)
     * 2.迭代的时候，先把数字属性名按照由小到大依次迭代，完成后在迭代字符串属性名（数字优先迭代）
     * 3.FOR-IN在迭代的时候，会把当前实例原型链上自己扩展的属性和方法也迭代到（迭代公有属性），内置的不能迭代（因为他们是不可枚举的）
     *
     *!/
    if (obj.hasOwnProperty(key)) {
        console.log(key);
    }
}*/








