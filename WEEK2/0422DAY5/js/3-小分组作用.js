/*
 * 分组的作用
 *   1.改变的默认的优先级
 *   2.分组捕获
 *   3.分组引用
 */
// let reg = /^18|19$/;
// console.log(reg.test('18'));//=>true
// console.log(reg.test('19'));//=>true
// console.log(reg.test('1819'));//=>true
// console.log(reg.test('189'));//=>true
// console.log(reg.test('181'));//=>true
// console.log(reg.test('819'));//=>true
// console.log(reg.test('119'));//=>true

// reg = /^(18|19)$/;
// console.log(reg.test('18'));//=>true
// console.log(reg.test('19'));//=>true
// console.log(reg.test('1819'));//=>false
// console.log(reg.test('189'));//=>false
// console.log(reg.test('181'));//=>false
// console.log(reg.test('819'));//=>false
// console.log(reg.test('119'));//=>false

// let reg = /^([a-z])([a-z])\2\1$/;//=>正则中出现的\1代表和第一个分组出现一模一样的内容...
// console.log(reg.test('oppo'));
// console.log(reg.test('poop'));

//=>编写一个正则匹配身份证号码
// let reg = /^\d{17}(\d|X)$/;//=>简单：只能匹配是否符合格式，不能提取出身份证中的一些信息
// '130828199012040617'
//=>130828 地域
//=>19901204 出生年月
//=>0617 倒数第二位：奇数=男  偶数=女

let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(?:\d|X)$/;
console.log(reg.exec('130828199012040617'));//=>EXEC实现的是正则捕获，获取的结果是一个数组，如果不匹配获取的结果是null，捕获的时候不仅把大正则匹配的信息捕获到，而且每一个小分组中的内容也捕获到了(分组捕获) : ["130828199012040617", "130828", "1990", "12", "04", "1", index: 0, input: "130828199012040617"]

/*
 * 正则捕获使用的是正则中的EXEC方法
 *   1.如果可以匹配获取的结果是一个数组，如果不能匹配获取的结果是NULL
 *   2.如果我们只在匹配的时候，想要获取大正则中部分信息，我们可以把这部分使用小括号包起来，形成一个分组，这样在捕获的时候，不仅可以把大正匹配的信息捕获到，而且还单独的把小分组匹配的部分信息也捕获到了(分组捕获)
 *   3.有时候写小分组不是为了捕获信息，只是为了改变优先级或者进行分组引用，此时我们可以在分组的前面加上“?:”，代表只去匹配，但是不把这个分组内容捕获
 */











