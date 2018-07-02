import React from 'react';
import './PayPassword.less'
import actions from '../../store/actions/pay'
import {connect} from 'react-redux'
import {verPayPassword} from '../../api/api'
import {Alert} from 'antd'

class PayPassword extends React.Component {
    async componentDidMount() {
        await this.props.getPayListPassWordAPI();
        this.refs.password.focus();
    }

    handleChange = (e) => {
        if (e.target.value.length === 6) {
            verPayPassword(e.target.value).then((result) => {
                if (result.successCode === 0) {
                    setTimeout(() => {
                        this.refs.success.style.display = "block";
                        setTimeout(() => {
                            // alert("支付成功！");
                            this.refs.success.style.display = "none";
                            this.props.history.push('/orderlist');
                        }, 2000)
                    }, 1000)
                } else {
                    // alert("支付失败,请重新输入密码！");
                    this.refs.error.style.display = "block";
                    setTimeout(() => {
                        this.refs.error.style.display = "none";
                        this.refs.password.value = "";
                    }, 2000)
                }
            });
        }

    };

    render() {
        return (<div>
                <div className="pay-password-container">
                    <p className="title">使用小米钱包支付</p>
                    <p className="price">{this.props.totalparice}<span>元</span></p>
                    {/*<div className="password">*/}
                    <input type="password" className="password" maxLength="6"
                           onChange={(e) => {
                               this.handleChange(e)
                           }}
                           ref="password"/>
                    <a className="forget">忘记密码？</a>
                    <a className="yijian">意见反馈</a>
                    <div ref="success" className="success">
                        <Alert message="支付成功!" description="" type="success"/>
                    </div>
                    <div ref="error" className="error">
                        <Alert message="支付失败" description="密码不正确，请重新输入！" type="error"/>
                    </div>
                    <p className="footer">- 由小米科技提供技术支持 -</p>
                </div>
            </div>
        )
    }
}

export default connect(state => ({...state.pay}), actions)(PayPassword)