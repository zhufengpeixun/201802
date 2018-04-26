/*
 * scrollTop / scrollLeft：滚动条卷去的宽度或者高度
 *
 *   最小卷去值：0
 *   最大卷去值：真实页面的高度 - 一屏幕的高度   document.documentElement.scrollHeight-document.documentElement.clientHeight
 *
 *   在JS盒子模型13个属性中，只有scrollTop/scrollLeft是“可读写”属性，其余都是“只读”属性
 *
 *   操作浏览器的盒子模型属性，我们一般都要写两套，用来兼容各种模式下的浏览器
 */
// console.log(utils.winHandle('scrollTop'));