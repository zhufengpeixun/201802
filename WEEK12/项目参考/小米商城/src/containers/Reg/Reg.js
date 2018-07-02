import React from 'react';
import './reg.less'
import {connect} from 'react-redux';
import actions from '../../store/actions/session';

@connect(state => ({...state.session}), actions)
export default class Reg extends React.Component {
    componentWillMount() {
        this.props.clearMessage();
    }

    render() {
        return (
            <div className="app-login-box">
                <div className="wap">
                    {/*头部LOGO*/}
                    <div className="login-header">
                        <div className="logBox">
                            <img src="http://img3.imgtn.bdimg.com/it/u=708806838,2716650849&fm=214&gp=0.jpg" alt=""/>
                        </div>
                        <h4 className="header_tit_txt" id="login-title">小米帐号注册</h4>
                    </div>
                    {/*账号*/}
                    <div className="user-username">
                        <input className="item_account" type="text" placeholder="用户名" ref={x => this.username = x}/>
                    </div>
                    {/*密码*/}
                    <div className="user-password">
                        <input className="item_account" type="password" placeholder="密码" ref={x => this.password = x}/>
                    </div>

                    {this.props.err == 1 ?
                        <p className="info_true" style={{color: "#BA3332"}}>{this.props.msg}</p> : null}
                    {this.props.success.length ?
                        <p className="info_false" style={{color: "#35BA79"}}>{this.props.success}</p> : null}

                    <div className="btns">
                        {/*注册按钮*/}
                        <div className="btn-SignIn">
                            <input type="submit" value="立即注册"
                                   onClick={() => this.props.toReg(this.username.value, this.password.value, this.props.history)}/>
                        </div>
                    </div>

                    {/*其他方式登录*/}
                    <div className="another">
                        <fieldset className="oth_type_tit">
                            <legend align="center" className="oth_type_txt">其他方式登录</legend>
                        </fieldset>
                        <div>
                        </div>
                    </div>

                    {/*微信支付宝微博*/}
                    <div className="oth_type_links">
                        <a className="icon_type icon_type_weibo_qq" href="#">
                            <i className="icon_default_qq"></i>
                        </a>
                        <a className="icon_type icon_type_weibo" href="#">
                            <i className="icon_default_weibo "></i>
                        </a>
                        <a className="icon_type icon_type_zhifubao" href="#">
                            <i className="icon_default_zhifubao"></i>
                        </a>
                    </div>
                    <div className="n_links_area">
                        <a>立即注册</a>
                        <span>|</span>
                        <a>忘记密码</a>
                    </div>
                </div>
                {/*字体切换*/}
                <div className="nf-link-area clearfix">
                    <ul className="lang-select-list">
                        <li><a href="javascript:void(0)" data-lang="zh_CN" className="lang-select-li current">简体</a>|
                        </li>
                        <li><a href="#" data-lang="zh_TW" className="lang-select-li">繁体</a>|</li>
                        <li><a href="#" data-lang="en" className="lang-select-li">English</a>|</li>
                        <li><a href="#" target="_blank">常见问题</a></li>
                    </ul>
                </div>


            </div>
        )
    }
}