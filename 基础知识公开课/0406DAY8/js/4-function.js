let sum = (...arg) => eval(arg.filter(item => !isNaN(item)).join('+'));
console.log(sum(10, '20', 'AA', 50));