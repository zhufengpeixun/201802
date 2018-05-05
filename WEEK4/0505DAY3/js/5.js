/*
 * 规定时间内的多方向匀速运动
 *    TIME 当前运动时间
 *    DURATION 总时间
 *
 *    [记录每一个方向的起始位置、目标值、总距离]
 *      BEGIN 起始位置
 *      TARGET 目标位置
 *      CHANGE 总距离
 */
/*let time = 0,
    duration = 1000;
let target = {
    left: document.documentElement.clientWidth - box.offsetWidth,
    top: document.documentElement.clientHeight - box.offsetHeight,
    width: 50,
    height: 50,
    fontSize: 30
};
// let change = {
//     left: target['left'] - begin['left'],
//     top: target['top'] - begin['top']
// };

//=>根据目标值计算出当前元素每一个运动方向的总距离（前提：计算出每个方向的起始值）
let change = {};
let begin = {};
for (let attr in target) {
    if (target.hasOwnProperty(attr)) {
        begin[attr] = parseFloat(window.getComputedStyle(box)[attr]);
        change[attr] = target[attr] - begin[attr];
    }
}

let animateTimer = setInterval(() => {
    time += 17;
    if (time >= duration) {
        clearInterval(animateTimer);
        for (let key in target) {
            if (target.hasOwnProperty(key)) {
                box.style[key] = target[key] + 'px';
            }
        }
        return;
    }
    //=>根据目标值中的方向，基于公式计算出每一个方向的当前位置
    let cur = {};
    for (let attr in target) {
        if (target.hasOwnProperty(attr)) {
            cur[attr] = time / duration * change[attr] + begin[attr];
        }
    }
    for (let key in cur) {
        if (cur.hasOwnProperty(key)) {
            box.style[key] = cur[key] + 'px';
        }
    }
}, 17);*/

animate(box, {
    top: 0,
    left: 0
}, function () {
    //=>this:box
    this.style.borderRadius = '50%';
    this.style.backgroundColor = 'green';
});

