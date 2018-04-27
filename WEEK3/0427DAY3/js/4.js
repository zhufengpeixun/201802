//=>当HTML结构都加载完成执行函数
// jQuery(function ($) {
//     let $tabBox = $('.tabBox'),
//         $tabList = $tabBox.find('.header>li');
//     // let $tabList = $('.tabBox>.header>li'),
//     //     $divList = $('.tabBox>div');
//
//     //=>基于JQ内置EACH机制,给每个LI都绑定了点击事件
//     $tabList.on('click', function () {
//         let index = $(this).index();//=>获取当前点击LI的索引
//         $(this).addClass('active')
//             .siblings().removeClass('active')
//             .parent().nextAll()
//             .eq(index).addClass('active')
//             .siblings('div').removeClass('active');
//     });
// });

jQuery(function ($) {
    $('.tabBox>.header>li').on('click', function () {
        let index = $(this).index();
        $(this).addClass('active')
            .siblings().removeClass('active')
            .parent().nextAll()
            .eq(index).addClass('active')
            .siblings('div').removeClass('active');
    });
});