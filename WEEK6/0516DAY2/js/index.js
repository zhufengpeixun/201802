/*
 * 关于AUDIO的一些常用属性
 *    [属性]
 *    duration:播放的总时间(S)
 *    currentTime:当前已经播放的时间(S)
 *    ended:是否已经播放完成
 *    paused:当前是否为暂停状态
 *    volume:控制音量 (0~1)
 *
 *    [方法]
 *    pause() 暂停
 *    play() 播放
 *
 *    [事件]
 *    canplay：可以正常播放（但是播放过程中可能出现卡顿）
 *    canplaythrough：资源加载完毕，可以顺畅的播放了
 *    ended：播放完成
 *    loadedmetadata：资源的基础信息已经加载完成
 *    loadeddata：整个资源都加载完成
 *    pause:触发了暂停
 *    play:触发了播放
 *    playing:正在播放中
 */

/*LOADING*/
let loadingRender = (function () {
    let $loadingBox = $('.loadingBox'),
        $current = $loadingBox.find('.current');

    let imgData = ["img/icon.png", "img/zf_concatAddress.png", "img/zf_concatInfo.png", "img/zf_concatPhone.png", "img/zf_course.png", "img/zf_course1.png", "img/zf_course2.png", "img/zf_course3.png", "img/zf_course4.png", "img/zf_course5.png", "img/zf_course6.png", "img/zf_cube1.png", "img/zf_cube2.png", "img/zf_cube3.png", "img/zf_cube4.png", "img/zf_cube5.png", "img/zf_cube6.png", "img/zf_cubeBg.jpg", "img/zf_cubeTip.png", "img/zf_emploment.png", "img/zf_messageArrow1.png", "img/zf_messageArrow2.png", "img/zf_messageChat.png", "img/zf_messageKeyboard.png", "img/zf_messageLogo.png", "img/zf_messageStudent.png", "img/zf_outline.png", "img/zf_phoneBg.jpg", "img/zf_phoneDetail.png", "img/zf_phoneListen.png", "img/zf_phoneLogo.png", "img/zf_return.png", "img/zf_style1.jpg", "img/zf_style2.jpg", "img/zf_style3.jpg", "img/zf_styleTip1.png", "img/zf_styleTip2.png", "img/zf_teacher1.png", "img/zf_teacher2.png", "img/zf_teacher3.jpg", "img/zf_teacher4.png", "img/zf_teacher5.png", "img/zf_teacher6.png", "img/zf_teacherTip.png"];

    //=>RUN:预加载图片的
    let n = 0,
        len = imgData.length;
    let run = function run(callback) {
        imgData.forEach(item => {
            let tempImg = new Image;
            tempImg.onload = () => {
                tempImg = null;
                $current.css('width', ((++n) / len) * 100 + '%');

                //=>加载完成:执行回调函数(让当前LOADING页面消失)
                if (n === len) {
                    clearTimeout(delayTimer);
                    callback && callback();
                }
            };
            tempImg.src = item;
        });
    };

    //=>MAX-DELAY:设置最长等待时间（假设10S，到达10S我们看加载多少了，如果已经达到了90%以上，我们可以正常访问内容了，如果不足这个比例，直接提示用户当前网络状况不佳，稍后重试）
    let delayTimer = null;
    let maxDelay = function maxDelay(callback) {
        delayTimer = setTimeout(() => {
            clearTimeout(delayTimer);
            if (n / len >= 0.9) {
                $current.css('width', '100%');
                callback && callback();
                return;
            }
            alert('非常遗憾，当前您的网络状况不佳，请稍后在试！');
            // window.location.href = 'http://www.qq.com';//=>此时我们不应该继续加载图片，而是让其关掉页面或者是跳转到其它页面
        }, 10000);
    };

    //=>DONE:完成
    let done = function done() {
        //=>停留一秒钟再移除进入下一环节
        let timer = setTimeout(() => {
            $loadingBox.remove();
            clearTimeout(timer);
        }, 1000);
    };

    return {
        init: function () {
            run(done);
            maxDelay(done);
        }
    }
})();

/*PHONE*/
let phoneRender = (function () {
    let $phoneBox = $('.phoneBox'),
        $time = $phoneBox.find('span'),
        $answer = $phoneBox.find('.answer'),
        $answerMarkLink = $answer.find('.markLink'),
        $hang = $phoneBox.find('.hang'),
        $hangMarkLink = $hang.find('.markLink'),
        answerBell = $('#answerBell')[0],
        introduction = $('#introduction')[0];

    //=>点击ANSWER-MARK
    let answerMarkTouch = function answerMarkTouch() {
        //1.REMOVE ANSWER
        $answer.remove();
        answerBell.pause();
        $(answerBell).remove();//=>一定要先暂停播放然后再移除，否则即使移除了浏览器也会播放着这个声音

        //2.SHOW HANG
        $hang.css('transform', 'translateY(0rem)');
        $time.css('display', 'block');
        introduction.play();
        computedTime();

    };

    //=>计算播放时间
    let autoTimer = null;
    let computedTime = function computedTime() {
        let duration = introduction.duration;
        autoTimer = setInterval(() => {
            let val = introduction.currentTime;
            //=>播放完成
            if (val >= duration) {
                clearInterval(autoTimer);
                return;
            }
            let minute = Math.floor(val / 60),
                second = Math.floor(val - minute * 60);
            minute = minute < 10 ? '0' + minute : minute;
            second = second < 10 ? '0' + second : second;
            $time.html(`${minute}:${second}`);
        }, 1000);
    };

    return {
        init: function () {
            //=>播放BELL
            answerBell.play();
            answerBell.volume = 0.3;

            $answerMarkLink.on('click', answerMarkTouch);
        }
    }
})();


//=>开发过程中,由于当前项目版块众多(每一个版块都是一个单例),我们最好规划一种机制:通过标识的判断可以让程序只执行对应版块内容,这样开发哪个版块,我们就把标识改为啥（HASH路由控制）
let url = window.location.href,//=>获取当前页面的URL地址  location.href='xxx'这种写法是让其跳转到某一个页面
    well = url.indexOf('#'),
    hash = well === -1 ? null : url.substr(well + 1);
switch (hash) {
    case 'loading':
        loadingRender.init();
        break;
    case 'phone':
        phoneRender.init();
        break;
}