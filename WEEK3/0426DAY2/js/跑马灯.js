/*
 * 实现JS动画
 *   让WRAPPER每间隔一段时间（最优动画时间是13~17MS）在原有的LEFT值基础上减去步长（想让动画快一些，步长就大一点）
 */
//=>JS中的定时器:间隔1000MS执行一次这个方法,直到手动清除为止
// let n = 0;
// setInterval(() => {
//     console.log(++n);
// }, 1000);

let wrapper = document.querySelector('.wrapper');
//1.把WRAPPER中原有的LI整体克隆一份放到容器的末尾（无缝滚动）
/*let wrapperList = wrapper.querySelectorAll('li');
let frg = document.createDocumentFragment();
[].forEach.call(wrapperList, item => {
    frg.appendChild(item.cloneNode(true));
});
wrapper.appendChild(frg);
frg = null;*/
wrapper.innerHTML += wrapper.innerHTML;
utils.css(wrapper, 'width', utils.css(wrapper, 'width') * 2);//=>克隆完成后别忘记修改一下WRAPPER的宽度(内容变多了)

//2.基于定时器实现动画
setInterval(() => {
    //=>获取当前WRAPPER的LEFT值，减去步长，把最新的LEFT赋值给元素即可
    let curL = utils.css(wrapper, 'left');
    curL -= 2;
    utils.css(wrapper, {
        left: curL
    });

    //=>实现无缝:当我们UL距离MARQUEE-BOX的左偏移已经是整个WRAPPER的一半宽度(第一组原始内容已经运动完成了，现在看到的是克隆后的)，此时我们让WRAPPER立即运动到LEFT为零的位置即可
    if (Math.abs(wrapper.offsetLeft) >= utils.css(wrapper, 'width') / 2) {
        utils.css(wrapper, 'left', 0);//=>立即回到起始的位置
    }
}, 17);