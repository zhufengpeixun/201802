let musicRender = (function () {
    let $headerBox = $('.headerBox'),
        $contentBox = $('.contentBox'),
        $footerBox = $('.footerBox'),
        $wrapper = $contentBox.find('.wrapper'),
        $lyricList = null,
        musicAudio = $('#musicAudio')[0],
        $playBtn = $headerBox.find('.playBtn'),
        $already = $footerBox.find('.already'),
        $duration = $footerBox.find('.duration'),
        $current = $footerBox.find('.current');

    //=>计算CONTENT区域的高度
    let computedContent = function computedContent() {
        let winH = document.documentElement.clientHeight,
            font = parseFloat(document.documentElement.style.fontSize);
        $contentBox.css({
            height: winH - $headerBox[0].offsetHeight - $footerBox[0].offsetHeight - 0.8 * font
        });
    };

    //=>获取歌词
    let queryLyric = function queryLyric() {
        return new Promise(resolve => {
            $.ajax({
                url: 'json/lyric.json',
                dataType: 'json',
                success: resolve
            });
        });
    };

    //=>绑定歌词数据
    let bindHTML = function bindHTML(lyricAry) {
        let str = ``;
        lyricAry.forEach(item => {
            let {minutes, seconds, content} = item;
            str += `<p data-minutes="${minutes}" data-seconds="${seconds}">${content}</p>`;//=>数据绑定的时候把歌词对应的分钟和秒设置为自定义属性存储起来,后期需要使用直接获取即可
        });
        $wrapper.html(str);
        $lyricList = $wrapper.find('p');
    };

    //=>开始播放
    let $plan = $.Callbacks();
    let playRun = function playRun() {
        musicAudio.play();
        musicAudio.addEventListener('canplay', $plan.fire);//=>能够播放了
    };

    //=>控制暂停播放
    $plan.add(() => {
        $playBtn.css('display', 'block')
            .addClass('move');

        $playBtn.tap(() => {
            if (musicAudio.paused) {
                //=>是否为暂停状态:是暂停我们让其播放
                musicAudio.play();
                $playBtn.addClass('move');
                return;
            }
            //=>当前是播放状态我们让其暂停
            musicAudio.pause();
            $playBtn.removeClass('move');
        });
    });

    //=>控制进度条
    let autoTimer = null;
    $plan.add(() => {
        let duration = musicAudio.duration;//=>获取的总时间是秒
        $duration.html(computedTime(duration));

        //=>随时监听播放状态
        autoTimer = setInterval(() => {
            let currentTime = musicAudio.currentTime;
            if (currentTime >= duration) {
                //=>播放完成
                clearInterval(autoTimer);
                $already.html(computedTime(duration));
                $current.css('width', '100%');

                musicAudio.pause();
                $playBtn.removeClass('move');
                return;
            }
            //=>正在播放中
            $already.html(computedTime(currentTime));
            $current.css('width', currentTime / duration * 100 + '%');
            matchLyric(currentTime);
        }, 1000);
    });

    //=>计算时间
    let computedTime = function computedTime(time) {
        //=>TIME:秒
        let minutes = Math.floor(time / 60),
            seconds = Math.floor(time - minutes * 60);
        minutes < 10 ? minutes = '0' + minutes : null;
        seconds < 10 ? seconds = '0' + seconds : null;
        return `${minutes}:${seconds}`;
    };

    //=>匹配歌词实现歌词对应
    let translateY = 0;
    let matchLyric = function matchLyric(currentTime) {
        //=>currentTime:已经播放的时间
        let [minutes, seconds] = computedTime(currentTime).split(':');

        //=>在歌词集合中筛选出我们想要展示的
        let $cur = $lyricList.filter(`[data-minutes="${minutes}"]`).filter(`[data-seconds="${seconds}"]`);
        if ($cur.length === 0) return;
        if ($cur.hasClass('active')) return;//=>当前歌词已经被选中了(例如：这句歌词可能需要五秒才能播放完成，我们定时器监听五次，第一次设置后，后面四次不需要重新设置了)

        let index = $cur.index();
        $cur.addClass('active')
            .siblings().removeClass('active');
        if (index >= 4) {
            //=>已经对应超过四条歌词了,接下来每当对应一条都让WRAPPER向上移动一行
            let curH = $cur[0].offsetHeight;
            translateY -= curH;
            $wrapper.css('transform', `translateY(${translateY}px)`);
        }
    };

    return {
        init: function () {
            computedContent();

            let promise = queryLyric();
            promise.then(result => {
                //=>FORMAT-DATA:去掉歌词中的特殊内容
                let {lyric = ''} = result,
                    obj = {32: ' ', 40: '(', 41: ')', 45: '-'};
                lyric = lyric.replace(/&#(\d+);/g, (...arg) => {
                    let [item, num] = arg;
                    item = obj[num] || item;
                    return item;
                });
                return lyric;//=>上一个THEN方法中返回的结果会作为下一个THEN实参传递过去
            })
                .then(lyric => {
                    //=>LYRIC:上一次处理好的结果
                    //=>FORMAT-DATA:把歌词对应的分钟、秒、歌词内容等信息依次存储起来
                    lyric += '&#10;';//=>向歌词末尾直接结束符
                    let lyricAry = [],
                        reg = /\[(\d+)&#58;(\d+)&#46;\d+\]([^&#]+)&#10;/g;
                    lyric.replace(reg, (...arg) => {
                        let [, minutes, seconds, content] = arg;
                        lyricAry.push({
                            minutes,
                            seconds,
                            content
                        });
                    });
                    return lyricAry;
                })
                .then(bindHTML)
                .then(playRun);
        }
    }
})();
musicRender.init();