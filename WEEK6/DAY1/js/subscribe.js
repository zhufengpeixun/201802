//=>JQ
// let $plan = $.Callbacks();
// $plan.add(function(x,y){});
// $plan.remove(function(){});
// $plan.fire(10,20);

~function anonymous(window) {
    class Subscribe {
        constructor() {
            //=>创建一个容器
            //每一个实例都有一个自己独有的容器,管理自己需要执行的方法即可
            this.pond = [];
        }

        //=>向计划表(POND池子)中增加方法:去重
        //FN:我们需要增加的方法
        add(fn) {
            let pond = this.pond,
                isExist = false;
            pond.forEach(item => item === fn ? isExist = true : null);
            !isExist ? pond.push(fn) : null;
        }

        //=>从计划表(POND池子)中移除方法
        remove(fn) {
            let pond = this.pond;
            pond.forEach((item, index) => {
                if (item === fn) {
                    // pond.splice(index, 1);//=>我们不能基于SPLICE删除，因为这种删除方式会改变原有的数组，例如：我们通知方法执行，当执行到FN3的时候（FIRE循环索引是2），但是基于SPLICE把FN1/FN2删除后，原始数组后面的项都向前提取两位，此时FIRE中继续遍历下一个方法（索引3），已经找不到和他匹配的那一项了

                    //=>让当前项赋值为NULL即可(这样函数移除掉了,但是此时的数组结构没有改变，不会出现数组塌陷的问题)
                    pond[index] = null;//=>item=null是不行的
                }
            });
        }

        //=>通知计划表中的方法依次执行
        //如果传递参数信息了,把这些参数依次赋值给执行的每一个方法
        fire(...arg) {
            let pond = this.pond;
            //=>REMOVE机制处理了,此时ITEM不一定都是函数了,还有可能是NULL
            //NULL的话不执行，而且最好是把这一项删除掉
            for (let i = 0; i < pond.length; i++) {
                let item = pond[i];
                if (item === null) {
                    pond.splice(i, 1);
                    i--;
                    continue;
                }
                item(...arg);
            }
        }
    }

    window.Subscribe = Subscribe;
}(window);


// let subscribe = new Subscribe();
// let fn1 = function fn1(x, y) {
//     console.log(1, x, y);
// };
// let fn2 = function fn2() {
//     console.log(2);
// };
// let fn3 = function fn3() {
//     console.log(3);
//     subscribe.remove(fn1);
//     subscribe.remove(fn2);
// };
// let fn4 = function fn4() {
//     console.log(4);
// };
//
// subscribe.add(fn1);
// subscribe.add(fn1);
// subscribe.add(fn2);
// subscribe.add(fn1);
// subscribe.add(fn3);
// subscribe.add(fn4);
//
// setInterval(() => {
//     subscribe.fire(100, 200);
// }, 1000);