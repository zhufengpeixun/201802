$(function () {
    let $diaLogMark = $('.diaLogMark'),
        $diaLogBox = $('.diaLogBox'),
        $boxTitle = $diaLogBox.find('.title'),
        $closeBtn = $boxTitle.find('i');

    //=>1.先让DIALOG-BOX在屏幕中间
    let winW = document.documentElement.clientWidth,
        winH = document.documentElement.clientHeight,
        boxW = $diaLogBox[0].offsetWidth,
        boxH = $diaLogBox[0].offsetHeight;
    $diaLogBox.css({
        top: (winH - boxH) / 2,
        left: (winW - boxW) / 2
    });

    //=>2.点击关闭按钮让DIALOG消失
    $closeBtn.on('click', function () {
        //=>FADE-OUT:JQ中提供的渐隐动画
        $diaLogBox.stop().fadeOut(200, () => {
            //=>动画完成
            $diaLogMark.css('display', 'none');
        });
    });

    //=>3.实现拖拽效果
    /*
     * 思路
     *  A:鼠标在H3中按下(MOUSE-DOWN)证明拖拽开始
     *  B:鼠标在H3中移动(MOUSE-MOVE)让盒子也跟着移动
     *  C:鼠标在H3上松开(MOUSE-UP)证明拖拽结束,此时我们再在H3中移动,不做任何的处理
     */

    //=>鼠标按下处理的事情：记录鼠标的起始位置和盒子的起始位置，在移动的过程中需要使用
    let dragStart = function dragStart(ev) {
        //=>this:H3
        /* $(this).attr({
            //=>ATTR：JQ中设置自定义属性（属性值最后都是字符串）
            //=>CSS：基于JQ中的CSS获取的样式属性值是带着单位的(13PX)
            starX: ev.clientX,
            starY: ev.clientY,
            starL: parseFloat($diaLogBox.css('left')),
            starT: parseFloat($diaLogBox.css('top'))
        });*/

        //=>基于普通对象的方式设置自定义属性,获取的时候THIS.XXX获取即可
        this.starX = ev.clientX;
        this.starY = ev.clientY;
        this.starL = parseFloat($diaLogBox.css('left'));
        this.starT = parseFloat($diaLogBox.css('top'));

        $boxTitle.on('mousemove', dragMove);//=>只有按下后才会给MOVE行为绑定方法（在H3中移动鼠标才会让其做一些事情）
    };

    //=>鼠标移动处理的事情:让盒子跟随鼠标一起移动(边界判断)
    let dragMove = function dragMove(ev) {
        //=>this:H3
        //=>随时根据鼠标的当前位置，减去起始的鼠标位置，计算出鼠标的偏移值，用偏移值加上盒子的起始位置，算出盒子的当前位置
        let {starX, starY, starL, starT} = this;
        let curL = ev.clientX - starX + starL,
            curT = ev.clientY - starY + starT;
        $diaLogBox.css({
            left: curL,
            top: curT
        });
    };

    //=>鼠标离开处理的事情
    let dragEnd = function dragEnd() {
        $boxTitle.off('mousemove', dragMove);//=>手指在H3中抬起，证明结束拖拽，我们把给MOVE绑定的方法移除，这样让鼠标再运动的时候，盒子也不会处理
    };
    $boxTitle.mousedown(dragStart);
    $boxTitle.mouseup(dragEnd);
});