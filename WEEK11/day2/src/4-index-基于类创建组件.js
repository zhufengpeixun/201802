import React from 'react';
import ReactDOM from 'react-dom';

function Sum(props) {
    // console.log(this);//=>undeifned
    return <div>
        函数式声明
    </div>;
}

/*class Dialog extends React.Component {
    constructor(props) {//=>props, context, updater
        super(props);//=>ES6中的EXTENDS继承，一但使用了CONSTRUCTOR，第一行位置必须设置SUPER执行：相当于React.Component.call(this)，也就是CALL继承，把父类私有的属性继承过来
        //=>如果只写SUPER()：虽然创建实例的时候把属性传递进来了，但是并没有传递父组件，也就是没有把属性挂载到实例上，使用THIS.PROPS获取的结果是UNDEFINED
        //=>如果SUPER(PROPS)：在继承父类私有的时候，就把传递的属性挂载到了子类的实例上，CONSTRUCTOR中就可以使用THIS.PROPS了

        //=>PROPS：当RENDER渲染并且把当前类执行创建实例的时候，会把之前JSX解析出来的PROPS对象中的信息（可能有CHILDREN）传递给参数PROPS => “调取组件传递的属性”
        console.log(props);

        /!*
         * this.props：属性集合
         * this.refs：REF集合（非受控组件中用到）
         * this.context：上下文
         *!/
        console.log(this.props);
    }

    render() {
        return <section>
            <h3>系统提示</h3>
            <div></div>
        </section>;
    }
}*/

class Dialog extends React.Component {
    constructor() {
        super();
        /*即使在CONSTRUCTOR中不设置形参PROPS接收属性，执行SUPPER的时候也不传这个属性，除了CONSTRUCTOR中不能直接使用THIS.PROPS，其它生命周期函数中都可以使用（也就是执行完成CONSTRUCTOR，REACT已经帮我们把传递的属性接收，并且挂载到实例上了）*/
    }

    /*componentWillMount() {
        //=>第一次渲染之前
        console.log(this.props);
    }*/

    render() {
        return <section>
            <h3>系统提示</h3>
            <div></div>
        </section>;
    }
}

ReactDOM.render(<div>
    珠峰培训
    <Dialog lx={2} con='哈哈哈'>
        <span>我是子元素</span>
    </Dialog>
</div>, root);