//=>CALL APPLY 的作用
//1.改变函数中的THIS(并且让函数执行)
//2.可以基于CALL让类数组借用数组原型上的方法（例如：借用SLICE实现把类数组转换为数组）
//3.可以基于CALL实现继承
//4.可以基于APPLY获取数组中的最大值和最小值
//...

// let ary = [12, 23, 24, 35, 16];
//=>获取数组中的最大值
//1.数组先排序，然后获取第一个和最后一个就是最大最小值
// console.log(ary.sort((a, b) => b - a)[0]);

//2.假设法：假设第一个是最大的，让其和后面每一项进行比较，如果当前项大于假设的值，修改假设的值
// let max = ary[0];
// ary.slice(1).forEach(item => {
//     item > max ? max = item : null;
// });
// console.log(max);

//3.基于APPLY
// console.log(Math.max.apply(null, ary));

//4.基于ES6的展开运算符
// console.log(Math.max(...ary));

//================
//34. 有两个升序数组，然后将他们合为 一个数组并进行升序排序？
// let ary1 = [1, 2, 3, 4, 5],
//     ary2 = [2, 3, 4, 5, 6];
// // let ary = ary1.concat(ary2).sort((a, b) => a - b);
// let ary = [...ary1, ...ary2].sort((a, b) => a - b);
// console.log(ary);

//35. 瀑布流的实现原理
// 1.并排排列三列，三列没有具体的高度，靠内容撑开
// 2.通过API接口地址，基于AJAX，从服务器端获取数据，拿出数据的前三项依次插入到三列中（数据绑定）
// 3.计算目前三列的高度，按照高度由小到大把三列进行排序，再次拿出获取数据中的三条，按照排好序的LI依次插入......一直基于这个规律插入完成即可
// 4.当用户下拉到页面底部，加载更多的数据即可

$(function () {
    /*//=>当页面结构加载完成执行函数
    $('#link').on('click', function () {
        $('<div class="center"></div>').appendTo(document.body);
    });*/
});

$('#nav>li>a').on('click', function (ev) {
    //=>this:当前点击的A
    //=>$(this):当前点击的A(JQ对象)

    //=>阻止点击A标签页面跳转的行为
    ev.preventDefault();

    //=>准备数据
    let $this = $(this),
        $p = $this.parent();
    let obj = {
        index: $p.index() + 1,
        name: $this.text(),
        link: $this.attr('href')
    };
    console.log(obj);
});








