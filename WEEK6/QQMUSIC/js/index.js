let musicRender = (function () {
    let $headerBox = $('.headerBox'),
        $contentBox = $('.contentBox'),
        $footerBox = $('.footerBox');

    //=>计算CONTENT区域的高度
    let computedContent = function computedContent() {
        let winH = document.documentElement.clientHeight,
            font = parseFloat(document.documentElement.style.fontSize);
        $contentBox.css({
            height: winH - $headerBox[0].offsetHeight - $footerBox[0].offsetHeight - 0.8 * font
        });
    };


    return {
        init: function () {
            computedContent();

        }
    }
})();
musicRender.init();