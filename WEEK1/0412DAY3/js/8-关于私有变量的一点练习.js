var ary = [12, 23];

function fn(ary) {
    console.log(ary);
    ary[0] = 100;
    ary = [100];
    ary[0] = 0;
    console.log(ary);
}

fn(ary);
console.log(ary);
