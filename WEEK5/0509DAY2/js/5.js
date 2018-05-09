inner.onmouseenter = function () {
    console.log('inner enter');
};
outer.onmouseenter = function () {
    console.log('outer enter');
};
inner.onmouseleave = function () {
    console.log('inner leave');
};
outer.onmouseleave = function () {
    console.log('outer leave');
};
/*
 * mouseeneter 和 mouseover 的区别?
 *   1.over属于滑过(覆盖)事件，从父元素进入到子元素，属于离开了父元素，会触发父元素的out，触发子元素的over
 *     enter属于进入，从父元素进入子元素，并不算离开父元素，不会触发父元素的leave，触发子元素的enter
 *
 *   2.enter和leave阻止了事件的冒泡传播，而over和out还存在冒泡传播的
 *
 * 所以对于父元素嵌套子元素这种情况，使用OVER会发生很多不愿意操作的事情，此时我们使用ENTER会更加简单，操作方便，所以真实项目中ENTER的使用会比OVER多
 */