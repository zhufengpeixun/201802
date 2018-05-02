~function ($) {
    function pluginBanner(options) {
        var $container = this,
            $wrapper = $container.children('.wrapper'),
            $focusBox = $container.children('.focusBox'),
            $arrowLeft = $container.children('.arrowLeft'),
            $arrowRight = $container.children('.arrowRight');
        var $slideList = null,
            $imgList = null,
            $focusList = null,
            bannerData = null;

        //=>INIT PARAMETERS
        var _default = {
            initIndex: 0,
            autoInterval: 2000,
            showFocus: true,
            needFocus: true,
            eventFocus: 'mouseenter',
            showArrow: true,
            eventArrow: 'click',
            needAuto: true,
            url: null
        };
        options && $.each(options, function (key, value) {
            if (options.hasOwnProperty(key)) {
                _default[key] = value;
            }
        });
        var initIndex = _default.initIndex,
            autoInterval = _default.autoInterval,
            showFocus = _default.showFocus,
            needFocus = _default.needFocus,
            eventFocus = _default.eventFocus,
            showArrow = _default.showArrow,
            eventArrow = _default.eventArrow,
            needAuto = _default.needAuto;

        //=>GET DATA & BIND DATA
        ~function () {
            $.ajax({
                url: _default.url,
                method: 'get',
                dataType: 'json',
                async: false,
                success: function (result) {
                    bannerData = result;
                }
            });

            var str = ``,
                strFocus = ``;
            $.each(bannerData, function (index, item) {
                str += `<li class="slide">
                <img src="" data-img="${item.img}" alt="">
            </li>`;

                if (showFocus) {
                    strFocus += `<li class="${index === bannerData.length - 1 ? 'last' : ''}"></li>`;
                }
            });
            $wrapper.html(str);
            showFocus ? $focusBox.html(strFocus) : null;

            //->GET ELEMENT
            $slideList = $wrapper.children();
            $imgList = $wrapper.find('img');
            showFocus ? $focusList = $focusBox.children() : null;
        }();

        //=>INIT SHOW
        ~function () {
            $slideList.css({
                opacity: 0,
                zIndex: 0
            }).eq(initIndex).css({
                opacity: 1,
                zIndex: 1
            });

            if (showFocus) {
                $focusList.removeClass('select')
                    .eq(initIndex).addClass('select');
            }
        }();

        //=>LAZY IMG
        $(window).on('load', function () {
            $imgList.each(function (index, item) {
                var tempImg = new Image;
                tempImg.onload = function () {
                    item.src = this.src;
                    item.style.display = 'block';
                    tempImg = null;
                };
                tempImg.src = $(item).data('img');//<=>item.getAttribute('data-img')
            });
        });

        //=>CHANGE BANNER
        var autoTimer = null,
            count = bannerData.length;

        needAuto ? autoTimer = setInterval(autoMove, autoInterval) : null;
        function autoMove() {
            initIndex++;
            initIndex === count ? initIndex = 0 : null;
            change();
        }

        //=>OTHER CHANGE
        $container.on('mouseenter', function () {
            needAuto ? clearInterval(autoTimer) : null;

            if (showArrow) {
                $arrowLeft.css('display', 'block');
                $arrowRight.css('display', 'block');
            }
        }).on('mouseleave', function () {
            needAuto ? autoTimer = setInterval(autoMove, autoInterval) : null;

            if (showArrow) {
                $arrowLeft.css('display', 'none');
                $arrowRight.css('display', 'none');
            }
        });

        if (showArrow) {
            $arrowRight.on(eventArrow, autoMove);
            $arrowLeft.on(eventArrow, function () {
                initIndex--;
                initIndex === -1 ? initIndex = count - 1 : null;
                change();
            });
        }

        if (showFocus && needFocus) {
            $focusList.on(eventFocus, function () {
                initIndex = $(this).index();
                change();
            });
        }

        //=>CHANGE
        function change() {
            var $curSlide = $slideList.eq(initIndex);
            $curSlide.css('zIndex', 1)
                .siblings().css('zIndex', 0);
            $curSlide.stop().animate({opacity: 1}, 200, function () {
                $curSlide.siblings().css('opacity', 0);
            });

            //->focus
            if (showFocus) {
                $focusList.eq(initIndex).addClass('select')
                    .siblings().removeClass('select');
            }
        }
    }

    $.fn.extend({
        pluginBanner: pluginBanner
    });
}(jQuery);