var a=9;
function fn(){
    a=0;
    return function(b){
        return b+a++;
    }
}
var f=fn();
console.log(f(5));
console.log(fn()(5));
console.log(f(5));
console.log(a);