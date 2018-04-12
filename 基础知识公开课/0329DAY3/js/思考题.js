var num = 12;
/*if (num > 0) {
    if (num < 10) {
        num++;
    } else {
        num--;
    }
} else {
    if (num == 0) {
        num++;
        num = num / 10;
    }
}*/
num > 0 ? (num < 10 ? num++ : num--) : (num === 0 ? (num++, num = num / 10) : null);