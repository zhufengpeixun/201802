import React from 'react';
import "./UserCenter.less";
import {toValidate, getUserInfo} from "../../api/api.js";
import {connect} from "react-redux";
import actions from "../../store/actions/login";
import {withRouter, Link} from "react-router-dom";

import user from "../../images/icon_default_head_portrait.png";
import right_arw from "../../images/device_shop_right_arrow.png";
import pending_payment from "../../images/personal_icon_paid.png";
import goods_receipt from "../../images/personal_icon_receipt.png";
import evaluate from "../../images/personal_icon_received_goods.png";
import refund from "../../images/personal_icon_return_goods.png";
import assets from "../../images/personal_icon_assets.png";
import collect from "../../images/personal_icon_collection.png";
import address from "../../images/personal_icon_address.png";
import message from "../../images/set_icon_message_new.png";
import feed from "../../images/personal_icon_feedback.png";

class UserCenter extends React.Component {
    async componentDidMount() {
        let validate = await toValidate();
        let userInfo = await getUserInfo();

        let username = userInfo.username;

        let $userInfo = this.userInfo;
        this.loginState = validate.user;
        if (validate.user) {
            this.toImg.style.display = "none";
            this.set.style.display = "block";
            this.quit.style.display = "block";
            $userInfo.innerHTML = username;
        } else {
            this.toImg.style.display = "block";
            this.set.style.display = "none";
            $userInfo.innerHTML = "请登录";
            this.quit.style.display = "none";
        }
    }

    turnCollectLogin = () => {
        if (!this.loginState) {
            this.props.history.push("/register");
        } else {
            this.props.history.push("/favors");
        }
    };

    turnOrderLogin = () => {
        if (!this.loginState) {
            this.props.history.push("/register");
        } else {
            this.props.history.push("/orderlist");
        }
    };

    turnLogin = () => {
        if (!this.loginState) {
            this.props.history.push("/register");
        }
    };

    render() {
        return (
            <div className="lyc-user-center">
                <div className="lyc-user-list">
                    <div className="lyc-user-header">
                        <div className="lyc-user-left">
                            <div className="lyc-user-img">
                                <img src={user}/>
                            </div>
                            <div className="lyc-user-login">
                                <span ref={x => this.userInfo = x}>请登录</span>
                            </div>
                        </div>
                        <div className="lyc-user-right">
                            <Link className="set-user-info" to={"/personaldata"}>
                                <i className="iconfont icon-shezhi-tianchong" ref={x => this.set = x}></i>
                            </Link>
                            <img ref={x => this.toImg = x} src={right_arw} onClick={this.turnLogin}/>
                        </div>
                    </div>
                    <div className="lyc-user-orderBox">
                        <div className="lyc-user-order">
                            <div className="lyc-order">
                                <span>我的订单</span>
                            </div>
                            <div className="lyc-order-arw" onClick={this.turnOrderLogin}>
                                <img src={right_arw}/>
                            </div>
                        </div>
                        <div className="lyc-user-order-detail">
                            <div className="lyc-pending-payment information" onClick={this.turnOrderLogin}>
                                <img src={pending_payment}/>
                                <span>待付款</span>
                            </div>
                            <div className="lyc-goods-receipt information" onClick={this.turnOrderLogin}>
                                <img src={goods_receipt}/>
                                <span>待收货</span>
                            </div>
                            <div className="lyc-pending-payment information" onClick={this.turnOrderLogin}>
                                <img src={evaluate}/>
                                <span>待评价</span>
                            </div>
                            <div className="lyc-pending-payment information" onClick={this.turnOrderLogin}>
                                <img src={refund}/>
                                <span>退款订单</span>
                            </div>
                        </div>
                    </div>
                    <div className="lyc-user-about-me">
                        <div className="about-me-top">
                            <div className="lyc-user-assets">
                                <div className="assets-img">
                                    <img src={assets}/>
                                </div>
                                <div className="assets-name">
                                    <span>我的资产</span>
                                </div>
                                <div className="assets-discount">
                                    <span>优惠券/积分</span>
                                </div>
                                <div className="assets-arw">
                                    <img src={right_arw}/>
                                </div>
                            </div>
                            <div className="lyc-user-collection" onClick={this.turnCollectLogin}>
                                <div className="collection-img">
                                    <img src={collect}/>
                                </div>
                                <div className="collection-name">
                                    <span>我的收藏</span>
                                </div>
                                <div className="collection-arw">
                                    <img src={right_arw}/>
                                </div>
                            </div>
                        </div>
                        <div className="about-me-bootom">
                            <div className="lyc-user-address">
                                <div className="address-img">
                                    <img src={address}/>
                                </div>
                                <div className="address-name">
                                    <span>地址管理</span>
                                </div>
                                <div className="address-arw">
                                    <img src={right_arw}/>
                                </div>
                            </div>
                            <div className="lyc-user-news">
                                <div className="news-img">
                                    <img src={message}/>
                                </div>
                                <div className="news-name">
                                    <span>消息中心</span>
                                </div>
                                <div className="news-arw">
                                    <img src={right_arw}/>
                                </div>
                            </div>
                            <div className="lyc-user-help">
                                <div className="help-img">
                                    <img src={feed}/>
                                </div>
                                <div className="help-name">
                                    <span>帮助与反馈</span>
                                </div>
                                <div className="help-arw">
                                    <img src={right_arw}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lyc-user-quit" ref={x => this.quit = x} onClick={() => {
                        this.props.signOutAPI(this.loginState, this.props.history.push('/main'));
                    }}>退出
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(state => ({...state}), actions)(UserCenter));