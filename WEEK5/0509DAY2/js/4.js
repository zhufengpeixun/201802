/*
 * 事件的传播机制
 *   冒泡传播：触发当前元素的某一个事件（点击事件）行为，不仅当前元素事件行为触发，而且其祖先元素的相关事件行为也会依次被触发，这种机制就是“事件的冒泡传播机制”
 */
/*window.onclick = function () {
    console.log('window');
};

document.onclick = function () {
    console.log('document');
};

document.documentElement.onclick = function () {
    console.log('html');
};*/
let aa = null;
document.body.onclick = function (ev) {
    console.log('body', ev, ev === aa);//=>TRUE
};

outer.onclick = function (ev) {
    console.log('outer', ev, ev === aa);//=>TRUE
};

inner.onclick = function (ev) {
    /*ev = ev || window.evenet;
    ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;*/
    aa = ev;
    console.log('inner', ev);
};

/*
 * xxx.onxxx=function(){}  DOM0事件绑定，给元素的事件行为绑定方法，这些方法都是在当前元素事件行为的冒泡阶段(或者目标阶段)执行的
 *
 * xxx.addEventListener('xxx',function(){},false)  第三个参数FALSE也是控制绑定的方法在事件传播的冒泡阶段(或者目标阶段)执行；只有第三个参数为TRUE才代表让当前方法在事件传播的捕获阶段触发执行（这种捕获阶段执行没啥实际意义，项目中不用）；
 */

/*
 * 不同浏览器对于最外层祖先元素的定义是不一样的
 *    谷歌：window->document->html->body...
 *    IE高：window->html->body...
 *    IE低：html->body...
 */

/*
 * 关于事件对象的一些理解
 *   1.事件对象是用来存储当前本次操作的相关信息，和操作有关，和元素无必然关联
 *   2.当我们基于鼠标或者键盘等操作的时候，浏览器会把本次操作的信息存储起来（标准浏览器存储到默认的内存中（自己找不到），IE低版本存储到window.event中了），存储的值是一个对象（堆内存）；操作肯定会触发元素的某个行为，也就会把绑定的方法执行，此时标准浏览器会把之前存储的对象（准确来说是堆内存地址）当做实参传递给每一个执行的方法，所以操作一次，即使再多方法中都有EV，但是存储的值都是一个（本次操作信息的对象而已）
 */










