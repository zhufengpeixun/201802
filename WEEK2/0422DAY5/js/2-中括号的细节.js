/*
 * 中括号的一些细节
 *   [xyz]
 *   [^xyz]
 *   [a-z]
 *   [^a-z]
 *
 * 1.中括号中出现的元字符一般都是代表本身含义的
 * 2.中括号中出现的两位数，不是两位数，而是两个数字中的任意一个
 */
// let reg = /^.+$/;//=>一个正则设置了^和$，那么代表的含义其实就是只能是xxx
// console.log(reg.test('n'));//=>true
// console.log(reg.test('1'));//=>true
// console.log(reg.test('nn'));//=>true
// console.log(reg.test('\n'));//=>false

// let reg = /^[.]+$/;
// console.log(reg.test('n'));//=>false
// console.log(reg.test('1'));//=>false
// console.log(reg.test('nn'));//=>false
// console.log(reg.test('\n'));//=>false
// console.log(reg.test('...'));//=>true

// let reg = /^[\d]+$/; //=>\d在这里依然是0~9中的一个数字
// console.log(reg.test('0'));//=>true
// console.log(reg.test('d'));//=>false

// let reg = /^[18]$/;//=>不加^和$代表字符串中只要包含xxx即可
// console.log(reg.test('18'));//=>false
// console.log(reg.test('1'));//=>true
// console.log(reg.test('8'));//=>true

// let reg = /^[12-65]$/;
// console.log(reg.test('13'));//=>false 不是12~65
// console.log(reg.test('7'));//=>false  这个正则的意思是 1或者2~6或者5
// console.log(reg.test('3.5'));//=>false

//年龄：18~65之间
/*
 * 18~19  1[89]
 * 20~59  [2-5]\d
 * 60~65  6[0-5]
 */
// let reg = /^((1[89])|([2-5]\d)|(6[0-5]))$/;

//=>需求：编写一个规则，匹配 "[object AAA]"
// let reg = /^\[object .+\]$/;
// console.log(reg.test('[object AAA]'));//=>true
