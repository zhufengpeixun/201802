jQuery(function ($) {
    let flowRender = (function () {
        let $flowList = $('.flowBox>li'),
            isRun = false,
            page = 0;

        //=>获取数据
        let queryData = function () {
            //=>记录是否正在加载中，加载中不在进行任何其余操作
            if (isRun) return;
            isRun = true;

            //=>每次请求新数据都把PAGE累加，这样真实项目中从服务器获取的数据就是不一样的（加载10页不在加载，提示没有更多数据，具体页数根据项目需求来定）
            if (page > 10) {
                alert('没有更多数据了');
                $(window).off('scroll', loadMore);
                return;
            }
            page++;

            $.ajax({
                url: 'json/data.json?page=' + page,
                method: 'get',
                dataType: 'json',
                cache: false,
                success: insertHTML
            });
        };

        //=>拼接出一个数据单元的字符串
        let queryHTML = function ({id, pic, link, title}) {
            return `<a href="${link}" target="_blank">
                <div><img src="${pic}" alt=""></div>
                <span>${title}</span>
            </a>`;
        };

        //=>为三个LI进行排序：按照内容的高度进行排序
        let sortLi = function () {
            let flowListAry = [].slice.call($flowList);
            if ($flowList[0].offsetHeight === 0) {
                //=>第一次：还没有加入任何内容，此时的顺序就是默认顺序
                return flowListAry;
            }
            //=>三列中已经存在内容,此时我们需要按照高度由小到大排序
            return flowListAry.sort(function (a, b) {
                return a.offsetHeight - b.offsetHeight;
            });
        };

        //=>每三个为一组,迭代所有的数据依次增加到页面中
        let insertHTML = function (result) {
            //=>result就是从服务器获取的数据
            for (let i = 0; i < result.length; i += 3) {
                let item1 = result[i],
                    item2 = result[i + 1],
                    item3 = result[i + 2];
                //=>给LI排序，并且向每个LI中追加内容
                let flowListAry = sortLi();
                item1 ? flowListAry[0].innerHTML += queryHTML(item1) : null;
                item2 ? flowListAry[1].innerHTML += queryHTML(item2) : null;
                item3 ? flowListAry[2].innerHTML += queryHTML(item3) : null;
            }
            isRun = false;
        };

        //=>加载更多
        let loadMore = function () {
            let winH = document.documentElement.clientWidth,
                pageH = document.documentElement.scrollHeight,
                scrollT = document.documentElement.scrollTop;
            if ((scrollT + 100) >= (pageH - winH)) {
                //=>距离底部还有100PX加载更多数据
                queryData();
            }
        };

        return {
            init: function () {
                queryData();

                //=>滚动到底部加载更多
                $(window).on('scroll', loadMore);
            }
        }
    })();
    flowRender.init();
});