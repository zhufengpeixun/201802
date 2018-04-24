// var n = 0,
//     fn = function () {
//         this.n *= 2;
//         n++;
//         return function (m) {
//             n += ++m;
//             console.log(n);
//         }
//     };
// var f = fn(2);
// f(3);
// fn(3)(4);
// f(4);
// console.log(n);

let i = 2;
let fn = function (n) {
    i *= 2;
    return function (m) {
        i -= (n--) + (++m);
        console.log(i);
    }
};
let f = fn(1);
f(2);
fn(3)(4);
f(5);
console.log(i);