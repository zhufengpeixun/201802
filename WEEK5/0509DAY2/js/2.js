/*
 * 事件绑定
 *   [DOM0级事件绑定]
 *     [element].onxxx=function(){}
 *
 *   [DOM2级事件绑定]
 *     [element].addEventListener('xxx',function(){},false);
 *     [element].attachEvent('onxxx',function(){}); [IE6~8]
 *
 * 目的：给当前元素的某个事件绑定方法（不管是基于DOM0还是DOM2），都是为了触发元素的相关行为的时候，能做点事情（也就是把绑定的方法执行）；“不仅把方法执行了，而且浏览器还给方法传递了一个实参信息值 ==>这个值就是事件对象”
 */

// box.onclick = function (ev) {
//     //=>定义一个形参EV用来接收方法执行的时候，浏览器传递的信息值（事件对象：MouseEvent鼠标事件对象、KeyboardEvent键盘事件对象、Event普通事件对象...）
//     //=>事件对象中记录了很多属性名和属性值，这些信息中包含了当前操作的基础信息，例如：鼠标点击位置的X/Y轴坐标，鼠标点击的是谁（事件源）等信息
//
//     //[MouseEvent]
//     // ev.target：事件源（操作的是哪个元素）
//     // ev.clientX / ev.clientY ：当前鼠标触发点距离当前窗口左上角的X/Y轴坐标
//     // ev.pageX / ev.pageY：当前鼠标触发点距离BODY(第一屏幕)左上角的X/Y轴坐标
//     // ev.preventDefault()：阻止默认行为
//     // ev.stopPropagation()：阻止事件的冒泡传播
//     // ev.type：当前事件类型
//
//     //[KeyboardEvent]
//     // ev.code：当前按键'keyE'
//     // ev.key：当前按键'e'
//     // ev.which / ev.keyCode：当前按键的键盘码 69
//     // let code = ev.which || ev.keyCode;
//
//     //=>常用的键盘码
//     /*
//      * 左-上-右-下：37-38-39-40
//      * Backspace：8
//      * Enter：13
//      * Space：32
//      * Delete：46
//      *
//      * Shift：16
//      * Alt：18
//      * Ctrl：17
//      * ESC：27
//      *
//      * F1~F12：112 ~ 123
//      * 48~57：数字键
//      * 65~90：小写字母
//      */
// };
//
// tempInp.onkeydown = function (ev) {
//     console.log(ev.which);
// };


//=>IE6~8
/*box.onclick = function (ev) {
    //=>在IE低版本浏览器中，浏览器执行绑定的方法，并没有把事件对象传递进来，此时ev===undefined，需要基于window.event来获取（由于是全局属性，鼠标每次操作都会把上一次操作的值替换掉）
    if (!ev) {
        //=>低版本中没有的属性，我们手动设置一下：按照自己有的先获取到值，然后赋值给和标准对应的新属性（经过判断处理后，低版本中也有TARGET/PAGE-X/PAGE-Y这些属性了），后期再使用的时候，直接按照高版本的使用即可
        ev = window.event;
        // console.log(ev.srcElement);//=>ev.srcElement是获取事件源（标准中使用的是ev.target）
        ev.target = ev.srcElement;
        // console.log(ev.pageX);//=>低版本浏览器的事件对象中不存在pageX/pageY
        ev.pageX = ev.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        ev.pageY = ev.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        ev.which = ev.keyCode;

        // preventDefault & stopPropagation 这些在低版本下都没有
        ev.preventDefault = function () {
            ev.returnValue = false;//=>低版本阻止默认行为
        };
        ev.stopPropagation = function () {
            ev.cancelBubble = true;//=>低版本阻止冒泡传播
        };
    }
    //=>直接按照高版本的规则来使用即可
    console.log(ev.target, ev.which);
    ev.preventDefault();
    ev.stopPropagation();
};*/

box.onclick = function (ev) {
    //=>用到谁给谁处理兼容
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
};







