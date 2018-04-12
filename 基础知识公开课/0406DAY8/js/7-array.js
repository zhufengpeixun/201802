var ary = [1, 2, 2, 2, 1, 2, 3, 2, 3, 2, 1],
    obj = {};
/*for (var i = 0; i < ary.length; i++) {
    var item = ary[i];
    if (obj[item] !== undefined) {
        /!*
         * ary.splice(i, 1); 基于SPLICE实现删除，数组中当前项后面的每一项都会改变索引，如果后面有很多很多值，性能消耗较大
         * i--;
         *
         * 我们要删除当前项，我们拿数组最后一项来代替当前项，在把最后一项在原有数组中删除即可（不要忘记：当前项被最后一项的新值取代了，下一次查找比较的依然应该在当前位置比->i也不能累加，还是原来的值才可以）
         * ary.pop
         * ary.splice(ary.length-1,1)
         * ary.length--
        *!/
        ary[i] = ary[ary.length - 1];
        ary.length--;
        i--;
        continue;
    }
    obj[item] = item;
}
console.log(ary);*/

console.log(Array.from(new Set(ary)));//=>基于ES6 SET实现去重