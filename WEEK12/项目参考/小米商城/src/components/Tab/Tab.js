import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import "./tab.less";

export default class Tab extends Component {
    render() {
        return (
            <div className="tabbar">
                <NavLink to='/home'>
                    <i className="iconfont icon-home_light"/>
                    <span>首页</span>
                </NavLink>
                <NavLink to='/category'>
                    <i className="iconfont icon-sortlight"/>
                    <span>分类</span>
                </NavLink>
                <NavLink to='/cart'>
                    <i className="iconfont icon-cart"/>
                    <span>购物车</span>
                </NavLink>
                <NavLink to='/user'>
                    <i className="iconfont icon-tubiaolunkuo-"/>
                    <span>我的</span>
                </NavLink>
            </div>
        )
    }
}