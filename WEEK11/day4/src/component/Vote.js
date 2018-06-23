import React from 'react';

//=>函数式组件声明：创建一个函数，里面返回一个JSX
/*
export default function Vote(props) {
    //=>PROPS:调取组件的时候传递进来的属性信息（可能包含：className/style/id...还有可能有children等）
    return <section className={'panel panel-default'}
                    style={{width: '50%', margin: '20px auto'}}>
        <div className={'panel-heading'}>
            <h3 className={'panel-title'}>
                {props.title}
            </h3>
        </div>
        <div className={'panel-body'}>
            支持人数：<span>0</span>
            <br/>
            反对人数：<span>0</span>
            <br/>
            支持比率：<span>0%</span>
            <br/>
            <br/>
            {/!*存放自己调取组件时候，额外扩展的标记*!/}
            {props.children}
            {/!*{
                React.Children.map(props.children, item => {
                    return item;
                })
            }*!/}
        </div>
        <div className={'panel-footer'}>
            <button className={'btn btn-success'}>支持</button>
            &nbsp;&nbsp;
            <button className={'btn btn-danger'}>反对</button>
        </div>
    </section>;
}
*/

//=>基于类创建组件（基于继承COMPONENT类实现的）
// 1. 调取组件相当于创建类的实例(THIS)，把一些私有的属性挂载到实例上了，这样组件内容所有方法中都可以基于实例获取这些值（包括：传递的属性和自己管理的状态）
// 2. 有自己的状态管理，当状态改变的时候，REACT会重新渲染视图（差异更新：基于DOM-DIFF只把需要重新渲染的部分渲染即可）
/*
export default class Vote extends React.Component {
    constructor(props) {
        super(props); //=>React.Component.call(this) 可以把componengt中的私有属性继承过来 this.props / this.state（this.setState） / this.contect / this.refs / this.updater

        //=>初始化状态
        this.state = {
            n: 0,
            m: 0
        };
    }

    render() {
        let {title, children} = this.props,
            {n, m} = this.state,
            rate = (n / (n + m)) * 100;
        isNaN(rate) ? rate = 0 : null;

        return <section className={'panel panel-default'}
                        style={{width: '50%', margin: '20px auto'}}>
            <div className={'panel-heading'}>
                <h3 className={'panel-title'}>
                    {title}
                </h3>
            </div>
            <div className={'panel-body'}>
                支持人数：<span>{n}</span>
                <br/>
                反对人数：<span>{m}</span>
                <br/>
                支持比率：<span>{rate.toFixed(2) + '%'}</span>
                <br/>
                <br/>
                {children}
            </div>
            <div className={'panel-footer'}>
                <button className={'btn btn-success'}
                        onClick={this.support}>支持
                </button>
                &nbsp;&nbsp;
                <button className={'btn btn-danger'}
                        onClick={this.against}>反对
                </button>
            </div>
        </section>;
    }

    support = ev => {
        //=>使用箭头函数是为了保证方法中的THIS永远是实例本身（无论在哪执行这个方法）
        //=>EV.TARGET:获取当前操作的事件源(DOM元素)
        this.setState({
            //=>修改状态信息并且通知RENDER重新渲染（异步操作：如果有其它代码执行，先执行其它的代码，然后再去通知状态修改）
            n: this.state.n + 1
        }, () => {
            //=>回调函数一般不用：当通知状态更改完成，并且页面重新渲染完成后，执行回调
        });
    };

    against = ev => {
        this.setState({
            m: this.state.m + 1
        });
    };
}*/

//=>REF是REACT中提供操作DOM的方案
//1. 给需要操作的元素设置REF（保持唯一性，否则会冲突覆盖）
//2. 在实例上挂载了REFS属性，它是一个对象，存储了所有设置REF的元素（REF值：元素对象）
export default class Vote extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {title, children} = this.props;
        return <section className={'panel panel-default'}
                        style={{width: '50%', margin: '20px auto'}}>
            <div className={'panel-heading'}>
                <h3 className={'panel-title'}>
                    {title}
                </h3>
            </div>
            <div className={'panel-body'}>
                支持人数：<span ref={'AA'}>0</span>
                <br/>
                反对人数：<span ref={'BB'}>0</span>
                <br/>
                支持比率：<span ref={'RATE'}>0%</span>
                <br/>
                <br/>
                {children}
            </div>
            <div className={'panel-footer'}>
                <button className={'btn btn-success'}
                        onClick={this.support}>支持
                </button>
                &nbsp;&nbsp;
                <button className={'btn btn-danger'}
                        onClick={this.against}>反对
                </button>
            </div>
        </section>;
    }

    support = ev => {
        this.refs.AA.innerHTML++;
        this.computed();
    };

    against = ev => {
        this.refs.BB.innerHTML++;
        this.computed();
    };

    computed = () => {
        let {AA, BB, RATE} = this.refs,
            n = parseFloat(AA.innerHTML),
            m = parseFloat(BB.innerHTML),
            ra = (n / (n + m)) * 100;
        isNaN(ra) ? ra = 0 : null;
        RATE.innerHTML = ra.toFixed(2) + '%';
    };
}
