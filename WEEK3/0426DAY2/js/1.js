//=>获取当前元素的某一个样式属性值
let getCss = function (curEle, attr) {
    if (typeof window.getComputedStyle === 'undefined') {
        //=>当前浏览器不兼容GET-COMPUTED-STYLE
        return;
    }
    let val = window.getComputedStyle(curEle, null)[attr],
        reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
    reg.test(val) ? val = parseFloat(val) : null;
    return val;
};

//=>设置当前元素的某一个具体样式的属性值
//JS中给元素设置样式只有两种
//1.设置元素的样式类名（前提：样式类及对应的样式已经处理完成）
//2.通过行内样式设置 xxx.style.xxx=xxx
let setCss = function (curEle, attr, value) {
    /*
     * 细节处理
     *   1.如果需要考虑IE6~8兼容，透明度这个样式在低版本浏览器中不是使用opacity，而是filter（我们两套都要设置）
     *   2.如果传递进来的VALUE值没有带单位,我们根据情况设置PX单位
     *     ->某些样式属性才会加单位：WIDTH/HEIGHT/PADDING(LEFT...)/MARGIN(LEFT...)/FONT-SIZE/TOP/LEFT/BOTTOM/RIGHT...
     *     ->用户自己传递的VALUE值中是没有单位的
     */
    if (attr === 'opacity') {
        curEle.style.opacity = value;
        curEle.style.filter = `alpha(opacity=${value * 100})`;
        return;
    }
    if (!isNaN(value)) {
        //=>IS-NaN检测的结果是FALSE：说明VALUE是纯数字没单位
        let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i;
        reg.test(attr) ? value += 'px' : null;
    }
    curEle['style'][attr] = value;
};

//=>给元素批量设置样式
let setGroupCss = function (curEle, options = {}) {
    //=>遍历传递的OPTIONS,有多少键值对,就循环多少次,每一次都调取SET-CSS方法逐一设置即可
    for (let attr in options) {
        if (!options.hasOwnProperty(attr)) break;
        //=>options:传递进来的需要修改的样式对象(集合)
        //=>attr:每一次遍历到的集合中的某一项(要操作的样式属性名)
        //=>options[attr]:传递的要操作的样式属性值
        setCss(curEle, attr, options[attr]);
    }
};
// setGroupCss(outer, {
//     width: 400,
//     height: 400,
//     padding: 30
// });

//=>CSS:集合GET/SET/SET-GROUP为一体的方法
/*let css = function (...arg) {
    //=>ARG:传递的实参集合
    let len = arg.length;
    if (len >= 3) {
        //=>单一设置:SET-CSS
        // arg=[outer, 'width', 500];
        // setCss(outer, 'width', 500);
        // setCss.apply(null,arg);
        setCss(...arg);
        return;
    }

    if (len === 2 && typeof arg[1] === 'object' && arg[1] !== null) {
        //=>传递两个参数，第二个参数是一个对象(不是NULL)，说明想要操作的是批量设置
        setGroupCss(...arg);
        return;
    }
    //=>剩下的代表获取样式
    return getCss(...arg);
};*/
/*let css = function (...arg) {
    let len = arg.length,
        fn = getCss;
    len >= 3 ? fn = setCss : null;
    len === 2 && (arg[1] instanceof Object) ? fn = setGroupCss : null;
    return fn(...arg);
};*/



/*
 * FOR-IN循环
 *   =>遍历一个对象中的键值对的，有多少组键值对，我们就遍历多少次
 */
// let obj = {name: 'xxx', age: 27, 0: 0, sex: 0, score: 100, 1: 1};

/*for (let key in obj) {
    // console.log(key);//=>KEY存储的是每一次循环获取的属性名
    // console.log(obj[key]);//=>每一次循环基于KEY获取属性值

    // if(key==='age'){
    //     break;  也支持BREAK和CONTINUE等关键词
    // }
    // console.log(key);
}*/

/*//=>FOR-IN遍历的时候有自己的顺序：先遍历数字属性名（按照小->大），再遍历字符串属性名（按照书写顺序）
for (let attr in obj) {
    console.log(attr);//=>0 1 name age sex score
}*/

/*//=>obj.__proto__===Object.prototype : obj是Object这个类的一个实例
//=>大括号中的是OBJ的私有属性，Object.prototype上的是OBJ公有属性
Object.prototype.bbbb = 1000;
for (let key in obj) {
    //=>FOR-IN循环只遍历当前对象可枚举（可遍历）的属性
    //1.对象的私有属性(自己写的)是可枚举的
    //2.浏览器内置的属性一般都是不可枚举的
    //3.自己在类的原型上设置的属性也是可枚举的,FOR-IN循环的时候也会被遍历出来（一般情况下我们是不想遍历到原型上的公有属性的）
    if (obj.hasOwnProperty(key)) {//=>一般使用FOR-IN在遍历对象的时候，我们加一个私有属性的验证，只有是私有的属性，我们才做操作
        console.log(key);
    }
}*/











