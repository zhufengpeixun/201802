import React from 'react';
import {NavLink} from 'react-router-dom'
import './Tab.less'

export default class Tab extends React.Component {
    render() {
        return (
            <div className='tab'>
                <NavLink to="/" exact={true} className="tab_link1">
                    <i className="icon"> </i>
                    <span>首页</span>
                </NavLink>
                <NavLink to="/goodscategory" className="tab_link2">
                    <i className="icon"> </i>
                    <span>分类</span>
                </NavLink>
                <NavLink to="/savour" className="tab_link3">
                    <i className="icon"> </i>
                    <span>品味</span>
                </NavLink>
                <NavLink to="/cart" className="tab_link4">
                    <i className="icon"> </i>
                    <span>购物车</span>
                </NavLink>
                <NavLink to="/usercenter" className="tab_link5">
                    <i className="icon"> </i>
                    <span>个人</span>
                </NavLink>
            </div>
        )
    }
}