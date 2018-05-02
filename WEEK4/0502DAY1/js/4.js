//=>数组去重（不改变原有数组）

//1.对象键值对处理（推荐）
// Array.prototype.myUnique = function () {
//     //=>this:ary 我们需要操作的数组，如果不想改变原有的数组，我们需要把要操作的数组克隆一份一模一样的处理，处理的都是克隆的这个数组
//     let _this = [...this],
//         obj = {};
//     for (let i = 0; i < _this.length; i++) {
//         let item = _this[i];
//         if (typeof obj[item] !== 'undefined') {
//             //=>当前迭代的这一项在数组中已经存在，我们把这一项在数组中干掉
//             // _this.splice(i, 1); [后面项移位，消耗性能]
//             _this[i] = _this[_this.length - 1];
//             _this.length--;
//             i--;
//             continue;
//         }
//         obj[item] = true;
//     }
//     obj = null;
//     return _this;
// };

//=>双循环(不推荐)
// Array.prototype.myUnique = function () {
//     let _this = [...this];
//     for (let i = 0; i < _this.length; i++) {
//         let item = _this[i];
//         //=>每一次迭代到ITEM后,都拿其后面的内容和它进行比较（出现和当前项相同的，我们就在数组中把其干掉）
//         for (let j = i + 1; j < _this.length; j++) {
//             if (item === _this[j]) {
//                 //=>删除索引J这一项
//                 _this[j] = _this[_this.length - 1];
//                 _this.length--;
//                 j--;
//             }
//         }
//     }
//     return _this;
// };

//=>indexOf：获取当前项在数组中第一次出现位置的索引，也能判断是否存在这一项（不存在获取的索引是-1），这个方法是不兼容IE6~8的
// Array.prototype.myUnique = function () {
//     let _this = [...this];
//     //=>依次迭代数组中的每一项，验证当前项在数组中是否存在（不是和整个数组比较是否存在，而是和当前项的后面项比较是否存在=>类似于双FOR）,存在把当前项干掉
//     for (let i = 0; i < _this.length; i++) {
//         let item = _this[i],
//             nextAry = _this.slice(i + 1);
//         if (nextAry.indexOf(item) > -1) {
//             _this[i] = _this[_this.length - 1];
//             _this.length--;
//             i--;
//         }
//     }
//     return _this;
// };

//=>排序后相邻去除法
//先把数组进行排序，验证当前项和后一项是否相同，如果不相同，说明没有重复，我们把着于相提取出来保存即可
// Array.prototype.myUnique = function () {
//     let _this = [],
//         ary = this.slice(0).sort((a, b) => a - b);
//     for (let i = 0; i < ary.length; i++) {
//         let item = ary[i],
//             next = ary[i + 1];
//         if (item !== next) {
//             _this.push(item);
//         }
//     }
//     return _this;
// };

let ary = [1, 2, 3, 2, 3, 4, 3, 2, 2, 2, 2, 3, 4, 5, 6, 7, 4, 1, 3, 2];
let uniqueAry = ary.myUnique();
console.log(uniqueAry);





