let $box = $('#box');
//=>animate:$.prototype
//EFFECT：linear\ease\ease-in\ease-out\ease-in-out

//=>stop:结束正在运行的动画，继续执行下一个新的动画
//=>finish:同stop一样也是结束正在运行的动画（结束动画后让元素立即运动到目标位置，从上一个动画的目标位置作为下一个动画的起始位置，stop是从哪停止的，就从哪开始）
// $box.stop().animate({
//     top: 300,
//     left: 500
// }, 500, () => {
//     $box.css({
//         borderRadius: '50%',
//         background: 'lightblue'
//     });
// });

// $box.animate({
//     top: 0,
//     left: 0
// }, 5000);
// setTimeout(() => {
//     $box.finish();
// }, 1000);

//=>快捷动画
//1. show/hide/toggle
//2. fadeIn/fadeOut/fadeToggle
//3. slideDown/slideUp/slideToggle
// 可以指定具体运动时间，也可以指定'slow' / 'fast'