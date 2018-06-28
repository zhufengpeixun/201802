import React from 'react';
import {connect} from 'react-redux';

class Nav extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <nav className='navbar navbar-default'>
            {/*LOGO*/}
            <div className='container-fluid col-md-2'>
                <a href="javascript:;" className='navbar-brand'>珠峰培训CRM</a>
            </div>

            {/*NAV*/}
            <div className='collapse navbar-collapse col-md-10'>
                <ul className='nav navbar-nav'>
                    <li><a href="javascript:;">首页</a></li>
                    <li><a href="javascript:;">客户管理</a></li>
                    <li><a href="javascript:;">计划管理</a></li>
                </ul>
            </div>
        </nav>;
    }
}

export default connect()(Nav);