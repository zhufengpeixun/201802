let ary = [12, 13, 14, 15, 12, 14, 13];

/*
 * 1.排序法：先排序，再获取第一个即可
 */
// ary.sort(function (a, b) {
// return a - b;
// });
// let min = ary[0];
// console.log(min);//=>12

/*
 * 2.假设法：假设第一个是最小的，然后依次和数组中的后面项比较，如果有比假设还小的，用当前最小的值替换假设值即可
 */
// let min = ary[0];
// for (let i = 1; i < ary.length; i++) {
//     let item = ary[i];
//     item < min ? min = item : null;
// }
// console.log(min);//=>12

/*
 * 3.基于Math.min获取最小值
 *  =>Math.min需要我们把要比较的数字一项项的传递给这个方法才可以,直接传递一个数组是不可以的
 *  =>可以基于apply完成：apply除了改变this，传递给方法的参数是以数组或者类数组形式编写的，但是也相当于一项项传递给函数
 */
// console.log(Math.min([12, 13, 14, 15, 12, 14, 13]));//=>NaN
// let min = Math.min.apply(null, ary);
// console.log(min);




