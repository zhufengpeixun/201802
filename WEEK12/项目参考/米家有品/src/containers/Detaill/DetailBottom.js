import React, {Component} from 'react'
import './animate.css'
import './detail_animate.css'
import shop from '../../images/gift.png'

import {connect} from 'react-redux'
import actions from '../../store/actions/detail/isDetailLogin'


class DetailBottom extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        this.props.getValidateAPI();
        this.props.getCollection(this.props.index);
        this.props.getDetailCollLen();

        let cart1 = this.refs.cart1;
        cart1.addEventListener('click', this.handLi4, false);
    }

    componentDidUpdate() {
        let cart1 = this.refs.cart1;
        if (this.state.count >= 4) {
            cart1.removeEventListener('click', this.handLi4, false)
        }
    }

    handLi1 = () => {
        this.props.isLogin(this.props.detailList.err, this.props.detailList.user);
        this.props.getCollection(this.props.index, 1);
    };

    handLi2 = () => {
        this.props.isLogin(this.props.detailList.err, this.props.detailList.user);
        this.props.loginTrue1(this.props.detailList.err, this.props.detailList.user);
    };

    handLi3 = () => {
        this.props.isLogin(this.props.detailList.err, this.props.detailList.user);
        this.props.loginTrue2(this.props.detailList.err, this.props.detailList.user);
    };

    handLi4 = () => {
        let art1 = this.refs.art1;
        let count1 = this.refs.count1;
        let wraper1 = this.refs.wraper1;

        this.props.isLogin(this.props.detailList.err, this.props.detailList.user);
        this.props.getDetailCart(this.props.index);

        this.setState({
            count: this.state.count + 1
        });

        if (this.state.count >= 4) {
            count1.style.display = 'block';
            clearTimeout(this.$timer4);
            this.$timer4 = setTimeout(() => {
                count1.style.display = 'none';
            }, 1200);

        } else {
            wraper1.style.display = 'block';
            art1.style.display = 'block';
            clearTimeout(this.$timer2);
            this.$timer2 = setTimeout(() => {
                art1.style.display = 'none';
                wraper1.style.display = 'none';
            }, 1200);
        }
    };

    render() {

        return (
            <div>
                <ul className="detail_route">

                    <div className="wraper1" ref="wraper1" style={{display: 'none'}}><img src={shop} alt=""
                                                                                          className="img1"/>
                    </div>
                    <div className="DetailCart" ref="art1" style={{display: 'none'}}>添加购物车成功</div>

                    <div className="DetailCount" ref='count1' style={{display: 'none'}}>亲,太贪心了,仅限购3次,but我喜欢~😙</div>
                    <li onClick={this.handLi1}>
                        {this.props.collectList.collState.collState ?
                            <img
                                src="https://static.home.mi.com/youpin/static/m/res/images/device_shop_detail_favor_v2.png"
                                alt=""/>
                            : <img
                                src="https://static.home.mi.com/youpin/static/m/res/images/device_shop_detail_unfavor_v2.png"
                                alt=""/>
                        }
                        <span
                            style={this.props.collectList.collState.collState ? {color: "#f00"} : {color: "#7a7a7a"}}>收藏</span>
                    </li>
                    <li onClick={this.handLi2}>
                        {this.props.detailList.err !== 1 ?
                            <i className="collLength" ref='handli2'>{this.props.detailCollLen.collLength}</i> : null}

                        <img src="https://static.home.mi.com/youpin/static/m/res/images/shop_cart.png" alt=""/>
                        <span>购物车</span>
                    </li>
                    <li onClick={this.handLi3}>
                        <span>立即购买</span>
                    </li>
                    <li ref="cart1">
                        <span>加入购物车</span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default connect((state) => ({...state.isDetail}), actions)(DetailBottom)