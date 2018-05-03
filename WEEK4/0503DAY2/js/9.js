$(function () {
    let $container = $('.container'),
        $imgList = null;

    //1.先绑定数据
    ~function () {
        let str = ``;
        for (let i = 0; i < 100; i++) {
            let ran = Math.round(Math.random() * 3 + 1);
            str += `<div class="imgBox">
            <img src="" alt="" data-src="img/banner${ran}.jpg">
        </div>`;
        }
        $container.html(str);

        $imgList = $container.find('img');
    }();

    //2.加载真实的图片
    //=>lazyImg:单张图片延迟加载(传递给我谁,我就加载谁)
    let lazyImg = curImg => {
        let $curImg = $(curImg),
            trueImg = $curImg.attr('data-src');
        let tempImg = new Image();
        tempImg.onload = () => {
            // $curImg.attr('src', trueImg).css({
            //     display: 'block'
            // });
            $curImg.attr('src', trueImg)
                .stop().fadeIn(300);//=>结束当前正在运行的动画,执行FADE-IN,让图片300MS内渐现出来(JQ中提供的动画方法)
            tempImg = null;
            curImg.isLoad = true;//=>图片加载成功后，设置一个自定义属性存储当前图片已经加载了，后期不需要重复的加载
        };
        tempImg.src = trueImg;
    };

    //=>computedImg:计算哪张图片可以加载了
    let computedImg = () => {
        //=>观察所有图片中谁能加载了，就执行LAZY-IMG让其加载即可
        $imgList.each((index, curImg) => {
            //=>A:当前图片所在盒子的底边距离BODY偏移
            //=>B:当前浏览器底边距离BODY偏移
            let $curImg = $(curImg),
                $imgBox = $curImg.parent(),
                A = $imgBox.offset().top + $imgBox.outerHeight(),
                B = document.documentElement.scrollTop + document.documentElement.clientHeight;
            if (A <= B) {
                //=>代表图片所在盒子呈现在视野中，开始加载真实的图片
                if (curImg.isLoad) {
                    //=>当前图片如果已经加载过了，不在重复的加载
                    return;
                }
                lazyImg(curImg);
            }
        });
    };
    $(window).on('load scroll', computedImg);//=>LOAD和SCROLL的时候做相同的事情（JQ中的事件绑定特点）
});