/*
 * 事件的默认行为：事件本身就是天生就有的，某些事件触发，即使你没有绑定方法，也会存在一些效果，这些默认的效果就是“事件的默认行为”
 *
 *   A标签的点击操作就存在默认行为
 *     1.页面跳转
 *     2.锚点定位(HASH定位[哈希定位])
 *
 *      <a href="http://www.zhufengpeixun.cn/" target="_blank">
 *          珠峰培训
 *      </a>
 *      target='_blank'：让其在新窗口打开
 *
 *      <a href="#box">珠峰培训</a> 首先会在当前页面URL地址栏末尾设置一个HASH值，浏览器检测到HASH值后，会默认定位到当前页面中ID和HASH相同的盒子的位置（基于HASH值我们还可以实现SPA单页面应用）
 *
 *   INPUT标签也有自己的默认行为
 *      1.输入内容可以呈现到文本框中
 *      2.输入内容的时候会把之前输入的一些信息呈现出来（并不是所有浏览器和所有情况下都有）
 *      ...
 *
 *   SUBMIT按钮也存在默认行为
 *      1.点击按钮页面会刷新
 *      <form action="http://www.zhufengpeixun.cn/">
            <input type="submit" value="提交">
        </form>
        在FORM中设置ACTION，点击SUBMIT，会默认按照ACTION指定的地址进行页面跳转，并且把表单中的信息传递过去（非前后端分离项目中，由服务器进行页面渲染，由其它语言实现数据交互，一般都是这样处理）

     ...
 */
//=>如何阻止默认行为
//1.阻止A标签的默认行为：很多时候我们使用A标签仅仅是想当做一个普通的按钮，点击实现一个功能，不想页面跳转，也不想锚点定位
/*
 * 在结构中阻止
 *   <a href="javascript:;">珠峰培训最新全栈视频，等你来拿~~</a>
 *   javascript:void 0/undefined/null...;
 *
 * 在JS中也可以阻止
 *   给其CLICK事件绑定方法，当我们点击A标签的时候，先触发CLICK事件，其次才会执行自己的默认行为
 */
// link.onclick = function (ev) {
//     ev = ev || window.event;
//     return false;
// };

// link.onclick = function (ev) {
//     ev = ev || window.event;
//     ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
// };

// tempInp.onkeydown = function (ev) {
//     // ev = ev || window.event;
//     // ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
//     return false;
// };
tempInp.onkeydown = function (ev) {
    ev = ev || window.event;

    let val = this.value.trim(),//=>TRIM去除字符串首位空格(不兼容) this.value=this.value.replace(/^ +| +$/g,'')
        len = val.length;
    if (len >= 6) {
        this.value = val.substr(0, 6);

        //=>阻止默认行为去除特殊按键（DELETE\BACK-SPACE\方向键...）
        let code = ev.which || ev.keyCode;
        if (!/^(46|8|37|38|39|40)$/.test(code)) {
            ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
        }
    }
};













