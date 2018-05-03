/*
 * 图片延迟加载（图片懒加载）
 *   前端性能优化的重要手段之一，开始加载页面的时候，并没有加载真实的图片，当页面结构和数据都呈现完成后，在加载真实的图片
 *
 *   1.在结构上，我们把IMG图片放到一个DIV盒子中，开始的时候图片的SRC(SRC中有地址就按照地址加载图片)为空，我们把图片的地址存放到自定义属性DATA-SRC中（此位置不展示真实的图片），我们给图片所在的盒子设置一个默认的背景图片占位(要求这张图片越小越好 1KB)
 *   2.在JS中，当监听到页面中的结构和数据都加载完成后（或者设置一个间隔时间），开始把DATA-SRC自定义属性中存储的真实图片地址赋值给IMG的SRC属性（浏览器此时开始加载真实的图片 =>为了防止图片地址不存在导致的404错误，我们在赋值给图片的SRC属性时，往往都会验证一下图片是否存在）
 */

//=>当页面加载完成（结构、数据、DOM等都加载完成）
// window.onload=function(){}
//=>也可以设置一个定时器，间隔多长时间后在加载真实图片（定时器是异步的，所以定时器能执行，也代表页面加载完成）
// setTimeout(function(){},100);

var imgBox = document.getElementById('imgBox'),
    pageImg = imgBox.getElementsByTagName('img')[0];
setTimeout(function () {
    //=>加载真实图片
    var trueImg = pageImg.getAttribute('data-src');

    //=>创建一个临时的IMG来验证
    // var tempImg = document.createElement('img');
    var tempImg = new Image();
    tempImg.onload = function () {
        //=>图片加载成功触发这个事件
        pageImg.src = trueImg;
        pageImg.style.display = 'block';
        tempImg = null;
    };
    tempImg.src = trueImg;//=>在部分IE浏览器中只有把SRC赋值放到ONLOAD下面才能起到作用


    //=>这样做不好：如果图片不存在，在部分浏览器中，页面中的IMG部分显示的是一个叉叉，不好看（我们最好在赋值给页面的SRC属性的时候，先验证一下图片是否存在，存在我们在赋值）
    // pageImg.src = trueImg;
    // pageImg.style.display = 'block';
}, 1000);





