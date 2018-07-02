import React from 'react';
import {connect} from 'react-redux'
import './Pay.less'
//导入组件
import Header from '../../components/Header/Header'
import PayFooter from './PayFooter'
import Bar from './Bar'
import BarThick from './BarThick'
//图片导入
import right_arrow from '../../images/device_shop_right_arrow.png'
import unselect from '../../images/unselect.png'
import pay_alipay from '../../images/pay_alipay.png'
import pay_mipay from '../../images/pay_mipay.png'
import checkbox from '../../images/std_icon_checkbox_check.png'
import xiaomi from '../../images/img.jpg'

import actions from '../../store/actions/pay'

class Pay extends React.Component {

    async componentDidMount() {
        await this.props.getPayListAPI();
    }

    render() {
        let total = null;
        return (
            <div className="pay-container">
                <Header back={true}>确认信息</Header>
                <div className="content">
                    <div className="address">
                        {/*<span>没有地址信息，请点击后添加地址</span>*/}
                        <div className="content">
                            <div className="name-phone">
                                <p className="name">杨波</p>
                                <p className="phone">151****8149</p>
                            </div>
                            <p className="ad">中国 北京 北京市 昌平区 回龙观地区 回龙观东大街3号楼02号东段珠峰培训(102200)</p>
                            <p className="post"></p>
                        </div>
                        <img src={right_arrow} alt=""/>
                    </div>
                    <BarThick/>
                    <div className="pay-method">
                        <div className="method">
                            <div className="logo">
                                <img src={pay_alipay} alt=""/>
                                <span>支付宝</span>
                            </div>
                            <img src={unselect} alt="" className="checkbox"/>
                        </div>
                        <Bar/>
                        <div className="method">
                            <div className="logo">
                                <img src={pay_mipay} alt="" className="pay"/>
                                <span>小米钱包</span>
                            </div>
                            <img src={checkbox} alt="" className="checkbox"/>
                        </div>
                    </div>
                    <BarThick/>
                    <div className="goods">
                        {this.props.paylist.map((item, index) => {

                            let sTotal = null;
                            let sNumber = null;
                            return (
                                <div key={index}>
                                    <div className="goods-title">
                                        {/*<img src={xiaomi} alt=""/>*/}
                                        <p>{item.from}</p>
                                    </div>
                                    <Bar/>
                                    <div className="goods-body">
                                        {item.goods.map((item, index) => {
                                            total += item.price * item.number;//商品总价
                                            sTotal += item.price * item.number;//小计
                                            sNumber += item.number;//数量小计
                                            return (<div key={index}>
                                                <div className="item">
                                                    <img src={item.url}
                                                         alt=""/>
                                                    <div>
                                                        <p>{item.title}</p>
                                                        <div>
                                                            <p>￥{item.price.toFixed(2)}</p>
                                                            <p>× {item.number}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Bar/>
                                            </div>)
                                        })}

                                    </div>
                                    <div className="goods-footer">
                                        <div className="msg">
                                            <label>买家留言</label>
                                            <input type="text" placeholder="选填、30字以内"/>
                                        </div>
                                        <Bar/>
                                        <div className="xiaoji">
                                            <div className="youfei">
                                                <p>邮费:0.00元</p>
                                            </div>
                                            <div className="">
                                                <p>共{sNumber}件商品，小计:<span>{sTotal.toFixed(2)}元</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    {this.props.paylist.length - 1 !== index ? <BarThick/> : null}
                                </div>
                            )
                        })}
                    </div>
                    <BarThick/>
                    <div className="other-info">
                        <div className="youhui">
                            <p>优惠券/优惠码</p>
                            <img src={right_arrow} alt=""/>
                        </div>
                        <Bar/>
                        <div className="peisong">
                            <p>配送方式</p>
                            <p>快速配送</p>
                        </div>
                        <Bar/>
                        <div className="fapiao">
                            <p>发票类型</p>
                            <div>
                                <p>个人电子发票</p>
                                <img src={right_arrow} alt=""/>
                            </div>
                        </div>
                    </div>
                    <BarThick/>
                    <div className="total">
                        <div className="item">
                            <p>商品总价</p>
                            <p>￥{total ? total.toFixed(2) : null}</p>
                        </div>
                        <Bar/>
                        <div className="item">
                            <p>运费</p>
                            <p>+￥0.00</p>
                        </div>
                        <Bar/>
                        <div className="item">
                            <p>优惠</p>
                            <p>-￥0.00</p>
                        </div>
                    </div>

                </div>
                <PayFooter total={total ? total.toFixed(2) : null}></PayFooter>
            </div>
        )
    }
}

export default connect(state => ({...state.pay}), actions)(Pay)