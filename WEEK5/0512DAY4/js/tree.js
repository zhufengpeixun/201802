let $menuBox = $('.menuBox');
$menuBox.on('click', function (ev) {
    let target = ev.target,
        $target = $(target),
        tarTag = target.tagName;

    //=>合并事件源:点击的是EM,我们让TARGRT也等于它弟弟SPAN,此时TARGET只有SPAN我们才处理,统一基于SPAN位置为参照即可
    if (tarTag === 'EM') {
        $target = $target.next();
        target = $target[0];
        tarTag = target.tagName;
    }

    //=>只有事件源是SPAN我们才会处理
    if (tarTag === 'SPAN') {
        let $ul = $target.next('ul'),
            $em = $target.prev('em');
        //=>基于JQ获取的结果一般都是JQ对象,即使没有获取到元素也是一个LENGTH为零的空对象,而不是NULL,所以 if($ul){...} 这样算存在不行 （“如果没有下级结构,我们什么都不做处理，有下一级结构在控制显示和隐藏即可”）
        if ($ul.length === 0) return;

        //=>EM的样式类名：如果是PLUS(加号)，说明当前是折叠的，我们应当让其展开，反之让其折叠起来
        let promise = new Promise(resolve => {
            $ul.stop().slideToggle(200, () => {
                resolve();
            });
        });
        if ($em.hasClass('plus')) {
            $em.addClass('minus').removeClass('plus');
            // $ul.stop().slideDown(200);
        } else {
            $em.addClass('plus').removeClass('minus');
            // $ul.stop().slideUp(200);
            //=>外层级收起,里面的小层级也都应该收起
            promise.then(() => {
                $ul.find('em').removeClass('minus').addClass('plus');
                $ul.find('ul').css('display', 'none');
            });
        }
    }
});