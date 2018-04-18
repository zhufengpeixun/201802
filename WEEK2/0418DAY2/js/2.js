/*
function unique(ary) {
    /!*
     * ary = AAAFFF000
     *!/
    var obj = {};
    for (var i = 0; i < ary.length; i++) {
        var item = ary[i];
        if (obj.hasOwnProperty(item)) {
            /!*
             * 优化方案一:
             *   不使用SPLICE删除(删除当前项,后面索引移动位置,如果后面有很多项,导致性能消耗较大)
             *   解决：把最后一项替换当前项，在把最后一项删除即可（会改变原有数组的顺序）
             *!/
            ary[i] = ary[ary.length - 1];
            ary.pop();
            i--;
            continue;
        }
        obj[item] = item;
    }
    obj = null;//=>优化二：OBJ没用后我们手动释放一下，节约内存
    return ary;//=>AAAFFF000
}
var ary = [1, 2, 3, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 1, 3];
var res = unique(ary);//=>AAAFFF000
*/

var ary = [12, 13, 23, 13, 12, 14, 12, 12, 14, 15];
//=>为啥ARY.SORT可以执行：因为SORT是ARRAY.PROTOTYPE上内置的属性方法,而ARY是它的一个实例,可以基于__PROTO__找到原型上的这个方法,然后调取使用
/*ary.sort(function (a, b) {
    return a - b;
});*/

/*
 * 基于内置类的原型扩展方法，供它的实例调取使用
 *   1.我们增加的方法最好设置“my”前缀(前缀是啥自己定)，防止把内置方法重写
 */
/*
Array.prototype.myUnique = function myUnique() {
    //=>方法中的THIS一般都是当前类的实例(也就是我们要操作的数组)
    //=>操作THIS相当于操作ARY，方法执行完成会改变原有数组
    var obj = {};
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        obj.hasOwnProperty(item) ? (this[i] = this[this.length - 1], this.length--, i--) : obj[item] = item;
    }
    obj = null;
};
ary.myUnique();//=>this:ary 此时方法执行完成的返回值是undefined(原有数组改变)
console.log(ary);
// ary.__proto__.myUnique();//=>this:ary.__proto__ (IE浏览器中屏蔽了我们对__proto__的操作)
// Array.prototype.myUnique();//=>this:Array.prototype 这种方式也很少用*/

//=>执行SORT返回排序后的数组(也是ARRAY的一个实例)，执行REVERSE返回的也是一个数组，执行POP返回的是删除的那一项(不是数组)
//=>JS中的链式写法：保证每一个方法执行返回的结果依然是当前类的实例，这样就可以继续调取方法使用了
/*ary.sort(function(a,b){
    return a-b;
}).reverse().pop();*/
// ary.sort(function(a,b){
//     return a-b;
// }).reverse().slice(2,7).join('+').split('+').toString().substr(2).toUpperCase();


Array.prototype.myUnique = function myUnique() {
    var obj = {};
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        obj.hasOwnProperty(item) ? (this[i] = this[this.length - 1], this.length--, i--) : obj[item] = item;
    }
    obj = null;
    return this;
};
var max = ary.myUnique().sort(function (a, b) {
    return a - b;
}).pop();

//=>思考题：
~function (pro) {
    pro.plus = function plus(val) {
        return this + Number(val);
    };
    pro.minus = function minus(val) {
        return this - Number(val);
    };
}(Number.prototype);
var n = 5;
var res = n.plus(3).minus(2);//=>res=6
console.log(res);

