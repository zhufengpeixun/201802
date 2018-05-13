~function ($) {
    if (typeof $ === 'undefined') {
        throw new ReferenceError('The current plugin needs to rely on jquery！');
    }

    //=>空函数没用:我们可以把它赋值给所有的回调函数默认值,也就是回调函数不传,执行的就是这个空函数(不会报错)
    let emptyFn = function emptyFn() {

    };

    class Drag {
        constructor(ele, options = {}) {
            if (typeof ele === 'undefined' || ele.nodeType !== 1) {
                throw new ReferenceError('ele is a must pass parameter and must be an element object！');
            }

            //=>INIT PARAMETERS
            let {selector = ele} = options;
            this.ele = ele;
            this.dragTarget = selector;
            if (typeof selector === 'string') {
                //=>传递一个选择器进来了:我们是想通过操作ELE中某个元素让ELE实现移动
                this.dragTarget = $(ele).find(selector)[0];
            }

            //=>给当前实例挂载三个属性:三个属性就是三个计划表
            this.dragstartPlan = $.Callbacks();
            this.dragingPlan = $.Callbacks();
            this.dragendPlan = $.Callbacks();

            //=>DRAG-START:保证执行原型上的方法,方法中的THIS都是当前类的实例
            this.dragTarget.addEventListener('mousedown', this.down.bind(this));
        }

        //=>MOUSE-DOWN
        down(ev) {
            this.starX = ev.clientX;
            this.starY = ev.clientY;

            let $ele = $(this.ele);
            this.starL = parseFloat($ele.css('left'));
            this.starT = parseFloat($ele.css('top'));

            this.MOVE = this.move.bind(this);
            this.UP = this.up.bind(this);
            document.addEventListener('mousemove', this.MOVE);
            document.addEventListener('mouseup', this.UP);

            this.dragstartPlan.fire(this, ev);//=>通知某一个计划表中的方法执行,把当前类的实例传递给计划表中每一个方法(可以传递更多的值)
        }

        //=>MOUSE-MOVE
        move(ev) {
            let {starX, starY, starL, starT} = this,
                curL = ev.clientX - starX + starL,
                curT = ev.clientY - starY + starT;
            this.curL = curL;
            this.curT = curT;
            $(this.ele).css({
                top: curT,
                left: curL
            });

            this.dragingPlan.fire(this, ev);
        }

        //=>MOUSE-UP
        up(ev) {
            document.removeEventListener('mousemove', this.MOVE);
            document.removeEventListener('mouseup', this.UP);

            this.dragendPlan.fire(this, ev);
        }
    }
    
    window.Drag = Drag;
}(jQuery);

/*
new Drag(ele, {
    selector: 'h3' //=>SELECTOR:当前需要操作的目标元素选择器(按住它实现让ELE移动,不传默认就是按住ELE移动)
});*/
