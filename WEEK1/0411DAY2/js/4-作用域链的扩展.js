/*
function fn() {
    /!*
     * 变量提升：无
     *!/
    // console.log(b);//=>Uncaught ReferenceError: b is not defined
    b = 13;
    //console.log('b' in window);//=>true  在作用域链查找的过程中，如果找到WIN也没有这个变量，相当于给WIN设置了一个属性B (window.b=13)
    console.log(b);//=>13
}

fn();
console.log(b);//=>13
*/