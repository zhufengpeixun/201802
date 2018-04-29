//=>OFFSET(LEFT/TOP/PARENT)

//1.offsetParent：获取当前元素的父级参照物(和CSS中POSITION定位的那个参照物是类似的)，与它的HTML结构中的父元素没有必然联系
/*
 * 父参照物：同一个平面中，所有元素的父参照物都是最外层的盒子
 *   在BODY这个平面中，所有平面中的元素，其父参照物都是BODY，BODY的父参照物是NULL
 *   基于POSITION定位（RELATIVE/ABSOLUTE/FIXED）可以改变层面，这样来改变某个元素的父参照物
 */
// utils.css(outer, 'position', 'relative');
// CENTER/INNER父参照物都是OUTER，OUTER父参照物找上级平面中的BODY

//2.offsetLeft / offsetTop：当前元素（外边框）距离其父参照物（内边框）的左偏移和上偏移（类似于MARGIN）

//=>需求：不管当前元素的父参照物是谁，都要获取当前元素距离BODY的左/上偏移
utils.css(outer, 'position', 'relative');
utils.css(inner, 'position', 'relative');