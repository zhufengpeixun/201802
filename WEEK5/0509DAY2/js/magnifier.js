/*
 * 1. 鼠标进入和离开SMALL-BOX，控制MARK以及BIG-BOX的显示隐藏
 * 2. 控制MARK在SMALL-BOX中运动，但是不能超过边界
 * 3. 当MARK在SMALL-BOX移动的时候，根据MARK移动的距离，计算出BIG-IMG在BIG-BOX中移动的距离（反向三倍：X/Y轴移动都是三倍，整体九倍）
 */
$(function () {
    var $magnifierBox = $('.magnifierBox'),
        $smallBox = $magnifierBox.find('.smallBox'),
        $mark = $smallBox.find('.mark'),
        $bigBox = $magnifierBox.find('.bigBox'),
        $bigImg = $bigBox.find('img');

    //=>控制MARK和BIG-BOX的显示隐藏
    $smallBox.on('mouseenter', function (ev) {
        $mark.css('display', 'block');
        $bigBox.css('display', 'block');
        computedMark(ev);//=>刚进入到盒子中，也把MARK位置计算出来

    }).on('mouseleave', function () {
        $mark.css('display', 'none');
        $bigBox.css('display', 'none');
    }).on('mousemove', function (ev) {
        //=>JQ中的EV已经是兼容所有浏览器的了（JQ内部处理了），我们只需要按照标准浏览器的属性使用即可
        computedMark(ev);//=>鼠标在盒子中移动随时计算MARK的位置
    });

    //=>鼠标在SMALL-BOX中移动的时候控制MARK跟着移动(计算出MARK的位置即可)
    function computedMark(ev) {
        var offsetObj = $smallBox.offset(),
            curL = ev.pageX - offsetObj.left - $mark.outerWidth() / 2,
            curT = ev.pageY - offsetObj.top - $mark.outerHeight() / 2;
        //->边界判断
        var minL = 0,
            minT = 0,
            maxL = $smallBox.outerWidth() - $mark.outerWidth(),
            maxT = $smallBox.outerHeight() - $mark.outerHeight();
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
        $mark.css({
            top: curT,
            left: curL
        });
        //=>MARK动，则右侧大图朝反向运动（横竖都是3倍）
        $bigImg.css({
            top: -curT * 3,
            left: -curL * 3
        });
    }
});