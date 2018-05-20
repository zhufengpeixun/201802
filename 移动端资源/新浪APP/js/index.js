/*--REM--*/
~function ($) {
    let computed = ()=> {
        let $HTML = $(document.documentElement),
            winW = $HTML[0].clientWidth,
            value = 100;
        value = winW < 640 ? winW / 640 * 100 : value;
        $HTML.css('fontSize', value);
    };
    computed();
    $(window).on('resize', computed);
}(Zepto);

/*--HEADER--*/
let headerRender = (function ($) {
    let $headerBox = $('.headerBox'),
        $menu = $headerBox.find('.menu'),
        $navBox = $headerBox.find('.navBox'),
        flag = false;//=>FALSE隐藏 TRUE显示

    return {
        init: function () {
            $menu.tap(function () {
                if (flag === false) {
                    $navBox.css({
                        padding: '.16rem 0',
                        height: '1.28rem'
                    });
                    flag = true;
                    return;
                }
                $navBox.css({
                    padding: '0',
                    height: '0'
                });
                flag = false;
            });
        }
    }
})(Zepto);
headerRender.init();

/*--BANNER--*/
let bannerRender = (function ($) {
    let bannerExample = null,
        $bannerBox = $('.bannerBox'),
        $wrapper = $bannerBox.find('.swiper-wrapper'),
        $plan = $.Callbacks();

    //=>数据绑定
    $plan.add(result=> {
        $bannerBox.css('display', 'block');

        let str = ``;
        result.forEach((item, index)=> {
            str += `<div class="swiper-slide">
                <a href="${item.link}">
                    <img data-src="${item.img}" class="swiper-lazy" alt="">
                    <p>${item.desc}</p>
                </a>
            </div>`;
        });
        $wrapper.html(str);
    });

    //=>初始化SWIPER
    $plan.add(()=> {
        bannerExample = new Swiper('.bannerBox', {
            autoplay: 3000,
            autoplayDisableOnInteraction: false,
            loop: true,
            pagination: '.swiper-pagination',
            paginationType: 'fraction',

            //=>有关于图片延迟加载的
            lazyLoading: true,
            lazyLoadingInPrevNext: true
        });
    });

    return {
        init: function () {
            $.ajax({
                url: 'banner.json',
                method: 'get',
                dataType: 'json',
                cache: false,
                success: $plan.fire
            });
        }
    }
})(Zepto);
bannerRender.init();

/*--LIVE--*/
let liveRender = (function ($) {
    let $liveBox = $('.liveBox'),
        $wrapper = $liveBox.find('.swiper-wrapper'),
        $plan = $.Callbacks(),
        liveExample = null;

    //=>数据绑定
    $plan.add(result=> {
        $liveBox.css('display', 'block');

        let str = ``;
        result.forEach(item=> {
            str += `<div class="swiper-slide">
                <a href="${item.link}">${item.title}</a>
            </div>`;
        });
        $wrapper.html(str);
    });

    //=>初始化SWIPER
    $plan.add(result=> {
        liveExample = new Swiper('.liveCon', {
            direction: 'vertical',
            autoplay: 3000,
            loop: true,
            onlyExternal: true //=>不能手动拖拽
        });
    });

    return {
        init: function () {
            $.ajax({
                url: 'aside.json',
                dataType: 'json',
                cache: false,
                success: $plan.fire
            });
        }
    }
})(Zepto);
liveRender.init();

/*--NEWS--*/
let newsRender = (function ($) {
    let $newsBox = $('.newsBox'),
        $plan = $.Callbacks(),
        loading = false;

    $plan.add(result=> {
        $newsBox.css('display', 'block');

        let frg = document.createDocumentFragment();
        result.forEach(item=> {
            let newsGroup = document.createElement('ul');
            newsGroup.className = 'newsGroup';
            newsGroup.setAttribute('data-isLoad', 'false');

            //=>向每一组UL中追加多个LI
            let str = ``,
                newsList = item['news'];
            newsList.forEach(cur=> {
                if ('imgList' in cur) {
                    str += `<li class="latest">
                    <a href="${cur.link}">
                        <h3>${cur.title}</h3>
                        <div>
                        ${
                        cur.imgList.map(img=> {
                            return `<p>
                                <img data-src="${img}">
                            </p>`;
                        }).join('')
                        }
                        </div>
                        <span>${cur.comment}<i class="icon-comment"></i></span>
                    </a></li>`;
                    return;
                }
                str += `<li><a href="${cur.link}">
                    <div><img data-src="${cur.src}" alt=""></div>
                    <h3>${cur.title}</h3>
                    <span>${cur.comment}<i class="icon-comment"></i></span>
                </a></li>`;
            });

            newsGroup.innerHTML = str;
            frg.appendChild(newsGroup);
        });
        $newsBox[0].appendChild(frg);
        frg = null;

        loading = false;
    });

    $plan.add(result=> {
        let $newsGroup = $newsBox.find('.newsGroup[data-isLoad="false"]');
        $newsGroup.each(function () {
            let $this = $(this);
            $this.attr('data-isLoad', 'true');

            let lazyTimer = setTimeout(()=> {
                $this.find('img[data-src]').each(function (index, item) {
                    let tempImg = new Image;
                    tempImg.src = item.getAttribute('data-src');
                    tempImg.onload = function () {
                        item.src = this.src;
                        item.style.opacity = 1;
                        tempImg = null;
                    }
                });
                clearTimeout(lazyTimer);
            }, 500);
        });
    });

    return {
        init: function () {
            $.ajax({
                url: 'news.json',
                dataType: 'json',
                cache: false,
                success: $plan.fire
            });

            $(window).on('scroll', function () {
                if (loading) return;
                let winH = document.documentElement.scrollHeight,
                    curH = document.documentElement.clientHeight + document.documentElement.scrollTop;
                if (curH + 100 >= winH) {
                    loading = true;
                    //=>快到底部了,我们加载最新的数据
                    $.ajax({
                        url: 'news.json',
                        dataType: 'json',
                        cache: false,
                        success: $plan.fire
                    });
                }
            });
        }
    }
})(Zepto);
newsRender.init();
