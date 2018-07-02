import React, {Component} from "react";
import "./PersonalData.less";
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";

import {connect} from "react-redux";
import actions from "../../store/actions/personaldata/personaldata";
import {getUserInfo, modifyUserName, signOut} from "../../../src/api/api";

class PersonalData extends Component {
    constructor() {
        super();
        this.state = {
            ifShow: false,
            userName: ""
        };
    }

    async componentWillMount() {
        let newData = await getUserInfo();
        this.setState({userName: newData.username});
    }

    // 显示修改姓名弹框
    handleEditUserName = (e) => {
        let target = e.target;
        this.setState({ifShow: !this.state.ifShow});
    };

    // 取消姓名修改弹框
    handleCancel = (e) => {
        let target = e.target;
        this.setState({ifShow: !this.state.ifShow});
    };

    // 确认修改姓名弹框
    handleConfirm = () => {
        this.setState({ifShow: !this.state.ifShow});
        // 发送修改后的请求
        modifyUserName(this.state.userName);
    };

    // 退出登录
    handleExict = () => {
        signOut();
    };

    render() {
        console.log(this.props);
        return (
            <div>
                <div className="personal-data">
                    {/*头部*/}
                    <Header back={true}>个人资料</Header>

                    {/*中间*/}
                    <div className="personal-data-list">
                        {/*基础资料*/}
                        <dl>
                            <dt>基础资料</dt>
                            <dd>
                                <span>头像</span>
                                <div>
                                    <img src="" alt=""/>
                                    <a href="javascript:;">&gt;</a>
                                </div>
                            </dd>
                            <dd>
                                <span>帐号</span>
                                <div>
                                    <span>1420490078</span>
                                </div>
                            </dd>
                            <dd>
                                <span>姓名</span>
                                <div onClick={this.handleEditUserName}>
                                    <span>{this.state.userName}</span>
                                    <a href="javascript:;">&gt;</a>
                                </div>
                            </dd>
                        </dl>
                        {/*密保资料*/}
                        <dl>
                            <dt>密保资料</dt>
                            <dd>
                                <span>手机号码</span>
                                <div>

                                    <span>151****8149</span>
                                </div>
                            </dd>
                            <dd>
                                <span>修改密码</span>
                                <div>
                                    <a href="javascript:;">&gt;</a>
                                </div>
                            </dd>
                        </dl>
                        {/*退出登录按钮*/}
                        <div className="personal-data-exit">
                            <Link onClick={this.handleExict} to={"/"}>退出登录</Link>
                        </div>
                    </div>
                </div>

                {/*点击修改姓名弹出蒙版和弹框*/}
                <div style={this.state.ifShow ? {display: "block"} : {display: "none"}}
                     className="personal-data-userdialog">
                    <div className="personal-data-username-bg">
                        <div className="personal-data-username">
                            <p>填写姓名</p>
                            <div className="personal-data-input">
                                <input type="text" value={this.state.userName} onChange={(e) => {
                                    this.setState({userName: e.target.value});
                                }}/>
                            </div>
                            <div className="personal-data-btn">
                                <a onClick={this.handleCancel} href="javascript:;">取消</a>
                                <a onClick={this.handleConfirm} href="javascript:;">确定</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({...state.personadata}), actions)(PersonalData);