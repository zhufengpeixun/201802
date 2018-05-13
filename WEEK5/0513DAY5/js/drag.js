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


    //=>3.实现拖拽

    // let drag = new Drag($diaLogBox[0], {
    //     selector: 'h3',
    //     dragstart: function () {
    //         //=>THIS:当前实例DRAG
    //         $(this.dragTarget).addClass('active');
    //     },
    //     draging: function () {
    //         //1.
    //         let minL = 0,
    //             minT = 0,
    //             maxL = winW - boxW,
    //             maxT = winH - boxH;
    //         let {curL, curT} = this;
    //         curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    //         curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
    //         $(this.ele).css({
    //             left: curL,
    //             top: curT
    //         });
    //
    //         //2.
    //
    //         //3.
    //     },
    //     dragend: function () {
    //         $(this.dragTarget).removeClass('active');
    //     }
    // });

    let drag = new Drag($diaLogBox[0], {
        selector: 'h3',
    });

    //=>后期想干什么，直接往计划表中增加方法即可
    drag.dragstartPlan.add((_this, ev) => {
        //=>_this:执行计划表传递给每一个方法的实例
        $(_this.dragTarget).addClass('active');
    });

    drag.dragstartPlan.add((_this, ev) => {
        $(_this.dragTarget).css('color', 'blue');
    });

    drag.dragendPlan.add((_this, ev) => {
        $(_this.dragTarget).removeClass('active');
        $(_this.dragTarget).css('color', '#000');
    });

    drag.dragingPlan.add((_this) => {
        let minL = 0,
            minT = 0,
            maxL = winW - boxW,
            maxT = winH - boxH;
        let {curL, curT} = _this;
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
        $(_this.ele).css({
            left: curL,
            top: curT
        });
    });
});













