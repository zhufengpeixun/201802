let matchRender = (function ($) {
    let $userList = $('.userList'),
        $wrapper = $userList.find('ul'),
        $tip = $userList.find('.tip'),
        $headerBox = $('.headerBox'),
        $searchBtn = $headerBox.find('.searchBtn');

    let limit = 10,//=>每页展示的数量
        page = 1,//=>当前是第几页
        pageNum = 1,//=>总页数
        total = 0,//=>总条数
        search = '',//=>搜索的内容
        isRun = false;//=>是否正在加载最新的数据

    //=>QUERY-DATA:获取数据
    let queryData = function queryData() {
        axios.get('/getMatchList', {
            params: {
                limit,
                page,
                search
            }
        }).then(result => {
            pageNum = parseFloat(result['pageNum']);
            total = parseFloat(result['total']);
            return result;
        }).then(bindHTML);
    };

    //=>BIND-HTML:数据绑定
    let bindHTML = function bindHTML(result) {
        let {code, list = []} = result;
        if (parseFloat(code) !== 0) {
            //=>获取数据失败:这个失败不是服务器返回失败，而是获取的数据不是我们最终想要的而已，非状态码的失败
            $wrapper.css('display', 'none');
            $tip.css('display', 'block');
            isRun = false;
            return;
        }

        //=>成功绑定数据
        $wrapper.css('display', 'block');
        $tip.css('display', 'none');
        let $frg = $(document.createDocumentFragment());
        list.forEach((item, index) => {
            let {id, name, picture, sex, matchId, slogan, voteNum, isVote} = item;
            /*从列表点击跳转到详情页面：我们把用户的ID通过问号传递参数的方式传递给详情页面 （?userId=xxx），到详情页面我们只需要获取到这个ID，然后根据传递ID不同展示不同的信息即可*/
            $frg.append(`<li>
                <a href="detail.html?userId=${id}">
                    <img src="${picture}" alt="${name}" class="picture">
                    <p class="title">
                        <span>${name}</span>
                        |
                        <span>编号 #${matchId}</span>
                    </p>
                    <p class="slogan">${slogan}</p>
                </a>
                <div class="vote">
                    <span class="voteNum">${voteNum}</span>
                    ${parseFloat(isVote) === 0 ? `<a href="javascript:;" class="voteBtn">投他一票</a>` : ``}
                </div>
            </li>`);
        });
        $wrapper.append($frg);
        $frg = null;

        //=>最新数据加载完成
        isRun = false;
    };

    return {
        init: function init() {
            //=>开始展示第一页的内容
            queryData();

            //=>下拉加载更多数据
            $(window).on('scroll', () => {
                let {
                    clientHeight,
                    scrollTop,
                    scrollHeight
                } = document.documentElement;
                if ((clientHeight + scrollTop + 200) >= scrollHeight) {
                    //=>即将到达页面底部：加载更多数据
                    //正在加载中是不允许加载新的数据化的
                    //如果已经把所有数据都加载完成了,也不再继续加载了
                    if (isRun) return;
                    if (page >= pageNum) return;
                    isRun = true;
                    page++;
                    queryData();
                }
            });

            //=>点击搜索
            $searchBtn.tap(() => {
                if (isRun) return;
                isRun = true;
                search = $searchBtn.prev('input').val().trim();
                page = 1;
                //=>还要把之前UL中的内容清空，然后展示最新搜索的信息即可
                $wrapper.html('');
                queryData();
            });
        }
    }
})(Zepto);
matchRender.init();
