import React, {Component} from 'react';
import "./OrderList.less";
import Header from '../../components/Header/Header';
import CollectionList from "../Collection/CollectionList";
import axios from "axios";
import {Link, withRouter} from "react-router-dom";

class OrderList extends Component {
    constructor() {
        super();
        this.state = {
            order: {
                bill: []
            },
        }
    }

    componentWillMount() {
        axios.get("/userbill").then(res => {
            this.setState({
                order: res
            })
        }).catch(err => {
            console.log(err);
        })
    }

    goodBack = () => {
        this.props.history.push("/usercenter");
    };

    render() {

        let {order} = this.state;
        //有订单渲染和无订单渲染
        if (order) {
            if (order.bill.length > 0) {
                return (
                    <div className="user-order-list user-order-has">
                        {/*<Header pushUser={"https://static.home.mi.com/youpin/static/m/res/images/std_tittlebar_main_device_back_normal.png"}></Header>*/}
                        <div className="header">
                            {<i className="header_icon" onClick={this.goodBack}>
                                <img
                                    src="https://static.home.mi.com/youpin/static/m/res/images/std_tittlebar_main_device_back_normal.png"
                                    alt=""/>
                            </i>}
                            {"我的订单"}
                        </div>
                        <div className="mainBox">
                            <div className="order-listBox">
                                <div className="order-list-item">
                                    <div className="item-titBox">
                                        <span>全部订单</span>
                                    </div>
                                </div>
                                <div className="order-list-item">
                                    <div className="item-titBox">
                                        <span>待付款</span>
                                    </div>
                                </div>
                                <div className="order-list-item">
                                    <div className="item-titBox">
                                        <span>待收货</span>
                                    </div>
                                </div>
                                <div className="order-list-item">
                                    <div className="item-titBox">
                                        <span>退款订单</span>
                                    </div>
                                </div>
                                <div className="order-list-item">
                                    <div className="item-titBox">
                                        <span>已收货</span>
                                    </div>
                                </div>
                            </div>
                            {/*<CollectionList/>*/}
                            <div className="collection-has-data" style={{fontSize: "12px"}}>
                                {
                                    order.bill.map((item, index) => {
                                        let num = 0;
                                        let total = 0;
                                        return (
                                            <div className="user-data" style={{fontSize: "12px"}} key={index}>

                                                <div className="order-date">
                                                    <div className="order-date-box">
                                                        <span> 订单日期：{item.time}</span>
                                                        <span>待收货</span>
                                                    </div>
                                                    <div className="order-date-close">物流把宝贝拼命送到您手中</div>
                                                </div>
                                                {

                                                    item.commodity.map((items, index) => {
                                                        //根据数量改变num和总价
                                                        num += items.number;
                                                        total += items.number * items.price;
                                                        return (
                                                            <div className="goods-container" key={index}>
                                                                <Link className="goods-wrrap"
                                                                      to={{pathname: "/detail/100748"}}>
                                                                    <img src={items.url} alt=""/>
                                                                    <div className="goods-text-box">
                                                                        <span
                                                                            className="goods-title">{items.title}</span>
                                                                        <span
                                                                            className="goods-price">￥{items.price}</span>
                                                                    </div>
                                                                    <span style={{
                                                                        marginRight: ".1rem",
                                                                        color: "#ccc"
                                                                    }}>X{items.number}</span>
                                                                </Link>

                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className="goods-total" style={{display: "block"}}>
                                                    <p>
                                                        共{num}件商品,
                                                        总金额:
                                                        <span>{total}元</span>
                                                    </p>
                                                </div>
                                            </div>

                                        )
                                    })
                                }

                            </div>

                        </div>

                    </div>
                )

            }
            return (
                <div className="user-order-list">
                    <Header back={true}>我的订单</Header>
                    <div className="mainBox">
                        <div className="order-listBox">
                            <div className="order-list-item">
                                <div className="item-titBox">
                                    <span>全部订单</span>
                                </div>
                            </div>
                            <div className="order-list-item">
                                <div className="item-titBox">
                                    <span>待付款</span>
                                </div>
                            </div>
                            <div className="order-list-item">
                                <div className="item-titBox">
                                    <span>待收货</span>
                                </div>
                            </div>
                            <div className="order-list-item">
                                <div className="item-titBox">
                                    <span>退款订单</span>
                                </div>
                            </div>
                            <div className="order-list-item">
                                <div className="item-titBox">
                                    <span>已收货</span>
                                </div>
                            </div>
                        </div>
                        <CollectionList/>
                    </div>

                </div>
            )
        }
        return null

    }
}

export default withRouter(OrderList)