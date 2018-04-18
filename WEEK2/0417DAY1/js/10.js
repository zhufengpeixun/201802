/*
 * 变量提升：
 *   var num;
 *   var obj;
 *   var fn;
 */
var num = 10,
    obj = {num: 20};//=>obj=aaafff000   =>{num:20,fn:bbbfff000}
obj.fn = (function (num) {
    /*
     * num=10
     * this->window
     */
    num = this.num + 10;//=>num=20 (21) (22)
    this.num = num + 10;//=>window.num=30

    return function () {//=>bbbfff000
        /*
         * fn()
         *   this->window
         *   window.num+= ++num; //=>window.num=51
         */
        /*
         * obj.fn()
         *   this->obj
         *   obj.num+= ++num; //=>obj.num=42
         */
        this.num += ++num;
    }
})(num);
var fn = obj.fn;//=>fn=bbbfff000
fn();
obj.fn();
console.log(num, obj.num);