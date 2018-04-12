var ary1 = [3, 4];
var ary2 = ary1;
ary2[0] = 1;
ary2 = [4, 5];
ary2[1] = 2;
ary1[1] = 0;
console.log(ary1, ary2);