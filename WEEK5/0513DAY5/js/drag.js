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
    let dragStart = function dragStart(ev) {
        //=>THIS:$boxTitle[0]  =>H3(我们把起始位置记录到H3上)
        this.starX = ev.clientX;
        this.starY = ev.clientY;
        this.starL = parseFloat($diaLogBox.css('left'));
        this.starT = parseFloat($diaLogBox.css('top'));

        /*$(document).on('mousemove', dragMove)
            .on('mouseup', dragEnd);

          此时dragMove/dragEnd中的THIS都是DOCUMENT，但是我们在DRAG-MOVE使用的THIS希望和DRAG-START中的THIS相同，都是H3即可
           A:bind
           B:箭头函数
        */

        //=>BIND是预先处理THIS
        // console.log(dragMove.bind(this) === dragMove);//=>FALSE:说明执行BIND把方法中的THIS预先进行改变处理，得到的结果和原有的函数是不一样的，也就是此时我们给DOCUMENT绑定的方法就不在是DRAG-MOVE了
        this.DRAG_MOVE = dragMove.bind(this);
        this.DRAG_END = dragEnd.bind(this);
        $(document).on('mousemove', this.DRAG_MOVE)
            .on('mouseup', this.DRAG_END);
    };

    let dragMove = function dragMove(ev) {
        //=>THIS:H3
        let {starX, starY, starL, starT} = this,
            curL = ev.clientX - starX + starL,
            curT = ev.clientY - starY + starT;
        //=>边界判断
        let minL = 0,
            minT = 0,
            maxL = winW - boxW,
            maxT = winH - boxH;
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
        $diaLogBox.css({
            left: curL,
            top: curT
        });
    };

    let dragEnd = function dragEnd(ev) {
        //=>THIS:H3
        $(document).off('mousemove', this.DRAG_MOVE)
            .off('mouseup', this.DRAG_END);
    };

    $boxTitle.mousedown(dragStart);
});
/*
 * 拖拽的一个问题：当鼠标移动过快，盒子需要计算最新的位置，但是计算速度跟不上鼠标的移动速度，导致鼠标离开了盒子（具体来说离开了H3），而我们的所有方法都是绑定给H3的相关事件行为的，鼠标不在H3上，不管做什么操作都不会和之前绑定的方法有关
 *   [鼠标不在H3上]
 *     1.鼠标继续移动，盒子也不动了，因为并没有触发H3的MOUSE-MOVE
 *     2.鼠标在H3以外松开，没有触发它的MOUSE-UP，也就是没有执行取消MOUSE-MOVE绑定方法的操作，此时H3的MOUSE-MOVE还绑定着呢，这样即使你鼠标松开课，我们鼠标重回到H3上，也会触发它的MOVE，让盒子跟着走
 *   ...
 *
 * 解决问题
 *   1.用一根绳子把H3和鼠标拴在一起，这样鼠标就不会离开H3了
 *      this.setCapture() ：把当前元素THIS和鼠标绑在一起
 *      this.releaseCapture()：解绑
 *     [此方法不兼容谷歌浏览器]
 *
 *   2.鼠标移动在快，也不会逃离DOCUMENT，此时我们可以把给document的mousemove绑定方法dragMove（给document的mouseup绑定方法dragEnd），只要是在文档中移动或者抬起鼠标，都执行对应的操作即可
 */













