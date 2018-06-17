/*
 * 导航插件：导入插件后，可以动态向页面中MAN-BOX盒子的起始位置创建一个NAV-BOX，并且完成相关的业务处理
 *   1.进入到登录页面或者注册页面，都会记录FROM-URL，当登录或者注册成功的时候，跳转回到原有的页面
 *   2.验证是否已经登录，展示不同的信息
 *   3.完成其余的业务，例如：退出、点击用户名进入到详情页面等
 */
$(function anonymous() {
    let $mainBox = $('.mainBox'),
        $navBox = null,
        $navList = null;

    //=>检测是否登录
    axios.get('/checkLogin').then(result => {
        //=>控制导航的显示
        let code = parseFloat(result.code);
        $mainBox.prepend(`<nav class="navBox">
            <a href="index.html">首页</a>
            ${code === 0 ? `<a href="javascript:;">登录</a><a href="javascript:;">注册</a>` : `<a href="detail.html"></a><a href="javascript:;">退出</a>`}
        </nav>`);
        $navBox = $mainBox.find('.navBox');
        $navList = $navBox.find('a');
        return code;
    }).then(code => {
        //=>如果已经登录：获取登录用户的用户信息
        if (code === 0) return;
        return axios.get('/getUser');
    }).then(result => {
        //=>未登录传递的是UNDEFINED,已登录传递的是用户的信息
        if (typeof result !== 'undefined') {
            let {data: {name}} = result;
            $navList.eq(1).html(name);
        }
    }).then(() => {
        //=>基于事件委托给NAV-BOX中的A绑定点击事件
        $navBox.tap(ev => {
            let target = ev.target,
                tarTAG = target.tagName,
                tarINN = target.innerHTML;
            if (tarTAG !== 'A') return;
            if (tarINN === '登录') {
                //=>window.location.href既可以实现页面跳转也可以基于这个属性获取当前页面的URL地址(一定要编码，否则特殊字符会和跳转的地址冲突)
                window.location.href = `login.html?fromURL=${encodeURIComponent(window.location.href)}`;
                return;
            }
            if (tarINN === '注册') {
                window.location.href = `register.html?fromURL=${encodeURIComponent(window.location.href)}`;
                return;
            }
            if (tarINN === '退出') {
                axios.get('/exitLogin');
                window.location.href = window.location.href;//=>页面刷新
                return;
            }
        });
    });
});