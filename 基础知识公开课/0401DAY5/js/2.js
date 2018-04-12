var n = [12, 23, 34];
var m = n;
m[0] = 100;
m = [100];
n[1] = 200;
console.log(n, m);