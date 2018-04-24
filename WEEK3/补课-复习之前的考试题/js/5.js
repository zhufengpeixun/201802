// for (let i = 0; i <= 5; i++) {
//     setTimeout(function () {
//         console.log(i);
//     }, 1000);
// }

// for (var i = 0; i <= 5; i++) {
//     ~function (i) {
//         setTimeout(function () {
//             console.log(i);
//         }, 1000);
//     }(i);
// }

// for (var i = 0; i <= 5; i++) {
//     setTimeout(function (i) {
//         return function () {
//             console.log(i);
//         }
//     }(i), 1000);
// }

// for (var i = 0; i <= 5; i++) {
//     setTimeout((i => () => console.log(i))(i), 1000);
// }

// for (var i = 0; i <= 5; i++) {
//     setTimeout(function (i) {
//         console.log(i);
//     }.bind(null, i), 1000);
// }

//...