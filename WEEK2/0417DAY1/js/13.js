/*
 * 1.元素绑定事件，方法中的this是当前操作的元素
 * 2.方法名前面是否有点，有点，点前面是谁this就是谁，没有this是window(严格模式下是undefined)
 * 3.构造函数执行,方法体中的this是当前类的一个实例
 *
 * 你以为你以为的就是你以为的
 */
/*
var fullName = 'language';
var obj = {
    fullName: 'javascript',
    prop: {
        getFullName: function () {
            return this.fullName;
        }
    }
};
console.log(obj.prop.getFullName());//=>this:obj.prop =>obj.prop.fullName =>undefined
var test = obj.prop.getFullName;
console.log(test());//=>this:window =>window.fullName =>'language'*/

/*
var name = 'window';
var Tom = {
    name: "Tom",
    show: function () {
        console.log(this.name);
    },
    wait: function () {
        var fun = this.show;//=>Tom.show
        fun();//=>this:window =>window.name =>'window'
    }
};
Tom.wait();//=>this:Tom
*/