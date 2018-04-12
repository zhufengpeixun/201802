var n = '10';
/*if (n == 5) {
    n++;
} else if (n == 10) {
    n += 2;
} else {
    n += 3;
}*/
switch (n) {
    case 5:
        n++;
        break;
    case 10:
        n += 2;
        break;
    default:
        n += 3;
}
console.log(n);