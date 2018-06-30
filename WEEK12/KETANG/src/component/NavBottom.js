import React from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import {Icon} from 'antd';

class NavBottom extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <footer className='footerNavBox'>
            <NavLink to='/course'>
                <Icon type='home'/>
                <span>首页</span>
            </NavLink>
            <NavLink to='/mycourse'>
                <Icon type='solution'/>
                <span>我的课程</span>
            </NavLink>
            <NavLink to='/person'>
                <Icon type='user'/>
                <span>个人中心</span>
            </NavLink>
        </footer>;
    }
}

export default withRouter(connect()(NavBottom));