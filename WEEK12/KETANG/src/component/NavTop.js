import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Icon} from 'antd';
import action from '../store/action/index';

/*TRANSITION*/
import Transition from 'react-transition-group/Transition';

const duration = 300,
    defaultStyle = {
        transition: `opacity ${duration}ms`,
        opacity: 0
    }, transitionStyles = {
        entering: {opacity: 0},
        entered: {opacity: 1}
    };

class NavTop extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            in: false
        };

        //=>每一次页面刷新，REDUX中存储的购物车信息都会消失，所以我们需要在页面刷新的时候，执行一个DISPATCH派发，把服务器中存储的购物信息存放到REDUX中（NAV是每一次页面刷新，不管在哪一个路由下都会执行的组件）
        this.props.queryUnpay();
        this.props.queryPay();
    }

    handleClick = ev => {
        let target = ev.target,
            tarTag = target.tagName;
        if (tarTag === 'LI') {
            this.props.queryList({
                page: 1,
                type: target.getAttribute('type'),
                flag: 'replace'//=>切换类别是替换REDUX容器中的状态信息
            });
            this.setState({in: false});
        }
    };

    render() {
        return <header className='headerNavBox'>
            {/*首页的导航*/}
            <div className='homeBox'>
                <div className='baseBox'>
                    <h1 className='logo'>珠峰培训</h1>

                    <Icon className='icon' type='bars' style={{
                        fontSize: '.6rem'
                    }} onClick={ev => {
                        this.setState({
                            in: !this.state.in
                        });
                    }}/>
                </div>
                <Transition in={this.state.in} timeout={0}>
                    {state => {
                        return <ul className='filterBox' style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                            display: this.state.in ? 'block' : 'none'
                        }} onClick={this.handleClick}>
                            <li type="all">全部课程</li>
                            <li type="react">REACT课程</li>
                            <li type="vue">VUE课程</li>
                            <li type="xiaochengxu">小程序课程</li>
                        </ul>;
                    }}
                </Transition>
            </div>
        </header>;
    }
}

export default withRouter(connect(null, action.course)(NavTop));