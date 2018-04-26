//=>在JQ类库中也存在一个方法叫做CSS，我们就是模拟JQ给大家讲解的CSS
/*
utils.css(outer, {
    width: 400,
    height: 300,
    color: 'red',
    background: 'lightblue'
});
console.log(utils.css(outer, 'padding'));*/

/*
 * offsetParent：当前盒子的父级参照物
 * offsetTop / offsetLeft：获取当前盒子距离其父级参照物的偏移量(上偏移/左偏移)  当前盒子的外边框开始~父级参照物的内边框
 */
//=>“参照物”：同一个平面中，元素的父级参照物和结构没有必然联系，默认他们的父级参照物都是BODY（当前平面最外层的盒子） BODY的父级参照物是NULL
// center.offsetParent  //=>BODY
// inner.offsetParent   //=>BODY
// outer.offsetParent   //=>BODY

//=>“参照物可以改变”：构建出不同的平面即可（使用zIndex，但是这个属性只对定位有作用），所以改变元素的定位(position:relative/absolute/fixed)可以改变其父级参照物
// utils.css(outer, {
//     position: 'relative' //=>把OUTER脱离原有的平面，独立出一个新的平面，后代元素的父级参照物都会以它为参考
// });
// console.log(center.offsetParent);//=>OUTER
// console.log(inner.offsetParent);//=>OUTER
// console.log(outer.offsetParent);//=>BODY
// utils.css(inner, {position: 'absolute'});
// console.log(center.offsetParent);//=>INNER
// console.log(inner.offsetParent);//=>OUTER
// console.log(outer.offsetParent);//=>BODY
// console.log(document.body.offsetParent);//=>NULL

//===================
utils.css(outer, {
    position: 'relative'
});
utils.css(inner, {
    position: 'absolute',
    top: 20,
    left: 20
});

//=>不管你的父级参照物是谁，我都要获取当前元素距离BODY的偏移量（左偏移和上偏移）
//1.不能修改既定的样式(不能基于POSITION方式改它的参照物了)














