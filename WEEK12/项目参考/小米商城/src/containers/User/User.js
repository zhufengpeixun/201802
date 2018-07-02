import React, {Component} from 'react';
import './user.less';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../../store/actions/session';
import a from '../../common/img/user.png';

@connect(state => ({...state.session}), actions)
export default class User extends Component {
    componentDidMount() {
        this.props.toValidate();
    }

    render() {
        return (
            <div className="app-user-navigation">
                <header className="app-header-wrapper">
                    <div className="user ui-flex">

                        <Link className="img" to="/login">
                            <img src={a}/>
                        </Link>
                        {this.props.user ? <p className="name">{this.props.user}</p> :
                            <p className="name">登录/注册</p>}
                    </div>
                </header>
                <div className="app-content-wrapper">
                    <div className="b1 ui-flex">
                        <div className="cite">我的订单</div>
                        <div className="span">
                            <a>全部订单
                                <i className="iconfont icon-icon-test"></i></a>
                        </div>
                    </div>
                    <ul className="b2">
                        <li className="dfk">
                            <a>
                                <div className="icon"></div>
                                <span>待付款</span>
                            </a>
                        </li>
                        <li className="dah">
                            <a>
                                <div className="icon"></div>
                                <span>待收货</span>
                            </a>
                        </li>
                        <li className="thx">
                            <a>
                                <div className="icon"></div>
                                <span>退换修</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="items">
                        <li className="i-member">
                            <a>
                                <cite>会员福利</cite>
                                <i className="iconfont icon-icon-test"></i>
                            </a>
                        </li>
                        <li className="i-wallet">
                            <a>
                                <cite>我的优惠</cite>
                                <i className="iconfont icon-icon-test"></i>
                            </a>
                        </li>
                    </ul>
                    <ul className="items">
                        <li className="i-service">
                            <a>
                                <cite>服务中心</cite>
                                <i className="iconfont icon-icon-test"></i>
                            </a>
                        </li>
                        <li className="i-mihome">
                            <a>
                                <cite>小米之家</cite>
                                <i className="iconfont icon-icon-test"></i>
                            </a>
                        </li>
                    </ul>
                    <ul className="items">
                        <li className="i-fcode">
                            <a>
                                <cite>F码通道</cite>
                                <i className="iconfont icon-icon-test"></i>
                            </a>
                        </li>
                    </ul>
                    <ul className="items">
                        <li className="i-setting">
                            <Link to="/logout">
                                <cite>设置</cite>
                                <i className="iconfont icon-icon-test"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}