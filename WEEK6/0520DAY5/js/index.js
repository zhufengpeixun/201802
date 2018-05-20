let headerRender = (function () {
    let $headerBox = $('.headerBox'),
        $navMenu = $headerBox.find('.navMenu'),
        $navBox = $('.navBox');

    let handleTap = function handleTap() {
        // $navBox.stop().slideToggle(200); //=>ZEPTO和JQ不完全一样：ZP中只是实现了部分JQ方法
        let block = $navBox.css('display');
        if (block === 'none') {
            $navBox.css('display', 'block');
            return;
        }
        $navBox.css('display', 'none');
    };

    return {
        init: function init() {
            $navMenu.tap(handleTap);
        }
    }
})();
headerRender.init();

/*BANNER*/
let bannerRender = (function () {
    let $bannerBox = $('.bannerBox'),
        $wrapper = $bannerBox.find('.swiper-wrapper');

    let queryData = function queryData() {
        return new Promise(resolve => {
            $.ajax({
                url: 'banner.json',
                dataType: 'json',
                success: resolve
            });
        });
    };

    let bindHTML = function bindHTML(result) {
        let str = ``;
        result.forEach(item => {
            let {img, desc} = item;
            str += `<div class="swiper-slide">
                <img src="${img}" alt="">
                <p>${desc}</p>
            </div>`;
        });
        $wrapper.html(str);
        $bannerBox.css('display', 'block');
    };

    let swiperInit = function swiperInit() {
        let swiper = new Swiper('.bannerBox', {
            loop: true,
            autoplay: 3000,
            autoplayDisableOnInteraction: false,
            pagination: '.swiper-pagination',
            paginationType: 'fraction'
        });
    };

    return {
        init: function init() {
            let promise = queryData();
            promise.then(bindHTML)
                .then(swiperInit);
        }
    }
})();
bannerRender.init();

/*MESSAGE*/
let messageRender = (function () {
    let $messageBox = $('.messageBox'),
        $wrapper = $messageBox.find('.swiper-wrapper');

    let queryData = function queryData() {
        return new Promise(resolve => {
            $.ajax({
                url: 'aside.json',
                dataType: 'json',
                success: resolve
            });
        });
    };

    let bindHTML = function bindHTML(result) {
        let str = ``;
        result.forEach(item => {
            let {title, link} = item;
            str += `<div class="swiper-slide">
                <a href="${link}">${title}</a>
            </div>`;
        });
        $wrapper.html(str);
        $messageBox.css('display', 'block');
    };

    let swiperInit = function swiperInit() {
        let swiper = new Swiper('.messageCon', {
            loop: true,
            autoplay: 3000,
            direction: 'vertical'
        });
    };

    return {
        init: function init() {
            let promise = queryData();
            promise.then(bindHTML)
                .then(swiperInit);
        }
    }
})();
messageRender.init();