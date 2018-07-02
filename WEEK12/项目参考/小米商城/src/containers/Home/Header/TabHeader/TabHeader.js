import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './tabHeader.less'

export default class TabHeader extends Component {
    render() {
        return (
            <div className="tabheader">
                <NavLink to="/home/refer">
                    <span>推荐</span>
                </NavLink>
                <NavLink to="/home/smart">
                    <span>智能</span>
                </NavLink>
                <NavLink to="/home/tv">
                    <span>电视</span>
                </NavLink>
                <NavLink to="/home/computer">
                    <span>电脑</span>
                </NavLink>
                <NavLink to="/home/phone">
                    <span>全面屏</span>
                </NavLink>
                <NavLink to="/home/living">
                    <span>生活周边</span>
                </NavLink>
            </div>
        )
    }
}