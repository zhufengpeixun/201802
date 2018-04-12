var num = 9;
switch (num) {
    case 10:
    case 5:
        num--;
        break;
    default:
        num = 0;
}
console.log(num);
//=>不加BREAK，后面的条件不管是否成立，都会被执行；利用此机制，我们可以完成一些特殊的处理，例如：如果num等于10和等于5都要做同一件事情，那么我们写在一起，不用加break即可

