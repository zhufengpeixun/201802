import React, {Component} from 'react';
import './nav.less';
import {withRouter, Link} from 'react-router-dom';

@withRouter
export default class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <a className="nav-item" onClick={() => this.props.history.goBack()}>
                    <i className="iconfont icon-fanhui nav-icon"/>
                </a>
                <div className="nav-title">{this.props.children}</div>
                <Link className="nav-item" to="/search">
                    <i className="iconfont icon-fangdajing nav-icon"/>
                </Link>
            </div>
        )
    }
}