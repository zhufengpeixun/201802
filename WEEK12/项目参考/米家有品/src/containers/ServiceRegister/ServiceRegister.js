import React, {Component} from 'react';
import "./ServiceRegister.less";
import {withRouter, Link} from "react-router-dom"
import {connect} from "react-redux";
import actions from "../../store/actions/register";
import {toRegister, getCode} from "../../api/api";

import mi_logo from "../../images/mi_logo.jpg";

class ServiceRegister extends Component {
    constructor() {
        super();
        this.state = {
            tipsAry: [
                "请输入手机号码~~",
                "手机号码格式不正确~~",
                "请输入短信验证码~~",
                "短信验证码不正确~~"
            ]
        }
    }

    //检查手机号和验证码的状态
    handleClick = () => {
        let reg = /^1\d{10}$/;
        let $box = this.box;
        let $phoneNum = this.mobile.value;
        let $checkNum = this.checkNum.value;
        let $phoneTips = this.tips;

        if ($phoneNum === "") {
            $box.style.display = "flex";
            $phoneTips.innerHTML = this.state.tipsAry[0];//手机未输入提示错误信息
            return;
        }

        if (!reg.test($phoneNum)) {//验证手机号，不匹配出现相应提示
            $box.style.display = "flex";
            $phoneTips.innerHTML = this.state.tipsAry[1];
            return;
        }

        if ($phoneNum === "" && $checkNum !== "") {
            $box.style.display = "flex";
            $phoneTips.innerHTML = this.state.tipsAry[0];
            return;
        }

        if ($phoneNum !== "" && $checkNum === "") {//手机号已经输入但是验证码未输入
            $box.style.display = "flex";
            $phoneTips.innerHTML = this.state.tipsAry[2];
            return;
        }

        this.getRegister();//手机号验证码输入后跳转到个人中心
    };

    //获取API中手机号和验证码登录后显示随机生成的用户名
    async getRegister() {
        let $phoneNum = this.mobile.value;
        let $checkNode = this.checkNum.value;
        let checkNodeNum = await toRegister($phoneNum, $checkNode);
        this.registerUser = checkNodeNum.user;
        if (this.registerUser) {
            this.props.history.push("/usercenter");
        }
    }

    //手机号码一旦输入相应提示信息消失
    handleInputPhoneNum = (e) => {
        let $box = this.box;
        let val = e.target.value;

        if (val !== "") {
            $box.style.display = "none";
        }
    };

    //获取API中的验证码的接口
    async getCodeFn() {
        let $phoneNum = this.mobile.value;
        let checkNode = await getCode($phoneNum);
        //this.phoneCheckNum = checkNode.mobileCode;//将获取的验证码放到实例上。
        setTimeout(() => {
            this.checkNum.value = checkNode.mobileCode;
        }, 3000);
    }

    //点击获取验证码，并且进入倒计时读秒状态
    getCheckNum = () => {
        let reg = /^1\d{10}$/;
        let $phoneNum = this.mobile.value;
        let $checkNum = this.checkNum.value;
        let $box = this.box;
        let $phoneTips = this.tips;

        if ($phoneNum === "" && $checkNum !== "") {//手机号未输入但验证码已输入
            $box.style.display = "flex";
            $phoneTips.innerHTML = this.state.tipsAry[0];
            return;
        }

        if ($phoneNum === "") {//手机号未输入但验证码已输入
            $box.style.display = "flex";
            $phoneTips.innerHTML = this.state.tipsAry[0];
            return;
        }

        if (!reg.test($phoneNum)) {
            $box.style.display = "flex";
            $phoneTips.innerHTML = this.state.tipsAry[1];
            return;
        }

        let $sendBtn = this.sendBtn;
        this.timerBack();
        if ($sendBtn.innerHTML === "重新发送") {
            this.timerBack();
        }

        //执行获取验证码
        this.getCodeFn();
    };
    //实现倒计时
    timerBack = () => {
        let $sendBtn = this.sendBtn;
        let time = 10;
        clearInterval(this.sendTimer);
        this.sendTimer = setInterval(() => {
            time = time - 1;
            $sendBtn.setAttribute("disabled", true);//不可点击
            $sendBtn.style.color = "#ccc";
            $sendBtn.innerHTML = `重新发送(${time})`;
            if (time == 0) {
                clearInterval(this.sendTimer);
                $sendBtn.removeAttribute("disabled");//可点击
                $sendBtn.style.color = "#003ab5";
                $sendBtn.innerHTML = `重新发送`;
            }
        }, 1000);
    };

    //验证码一旦输入相应提示消失
    handleCheckNum = (e) => {
        let $box = this.box;
        let val = e.target.value;

        if (val !== "") {
            $box.style.display = "none";
        }
    };

    render() {
        return (
            <div className="lyc-user-layout">
                <div className="user-layout-panel">
                    <div className="user-layout">
                        <div className="mi-logo">
                            <div className="header-logoBox">
                                <div className="custom-logo">
                                    <img src={mi_logo}/>
                                </div>
                                <h4 className="header-tit">小米帐号登录</h4>
                            </div>
                            <div className="user-register-input">
                                <div className="region-core">
                                    <div className="city-list">
                                        <span>+86</span>
                                    </div>
                                    <input type="text" className="phone-count" placeholder="手机号码"
                                           ref={x => this.mobile = x}
                                           onKeyUp={this.handleInputPhoneNum}/>
                                </div>
                                <div className="pwd-panel">
                                    <div className="check-numBox">
                                        <input type="text" className="check-num" placeholder="短信验证码"
                                               ref={x => this.checkNum = x}
                                               onKeyUp={this.handleCheckNum}/>
                                    </div>
                                    <div className="get-num">
                                        <a href="javascript:;" onClick={this.getCheckNum}
                                           ref={x => this.sendBtn = x}>获取验证码</a>
                                    </div>
                                </div>
                            </div>
                            <div className="phone-dialog" ref={x => this.box = x}>
                                <div className="dialog-logo">!</div>
                                <p className="dialog-tit" ref={x => this.tips = x}></p>
                            </div>
                            <div className="login_phone">
                                <input className="btn_login" type="submit" value="立即登录/注册" onClick={this.handleClick}/>
                            </div>
                            <div className="others_logo">
                <span className="phone_msg_log">
                  <Link to={"/login"}>用户密码登录</Link>
                </span>
                                <div className="others-tit">
                                    <span>其他登录方式</span>
                                </div>
                                <div className="others-link">
                                    <i className="iconfont icon-qq"></i>
                                    <i className="iconfont icon-weibo"></i>
                                    <i className="iconfont icon-unie654"></i>
                                </div>
                                <div className="language">
                                    <span>简体</span>|<span>繁体</span>|<span>English</span>|<span>常见问题</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(state => ({...state}), actions)(ServiceRegister));