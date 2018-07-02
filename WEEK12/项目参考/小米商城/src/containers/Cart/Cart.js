import React, {Component} from 'react';
import Nav from "../../components/Nav/Nav";
import Goods from "./Goods/Goods";
import Settlement from "./Settlement/Settlement";
import './Cart.less';
import {connect} from 'react-redux';
import actions from '../../store/actions/cart';
import {validate} from "../../api/session";
import {Link} from 'react-router-dom';

@connect(state => ({...state.cart}), actions)
export default class Cart extends Component {
    constructor() {
        super();
        this.state = {
            err: 0
        }
    }

    async componentWillMount() {
        let userInfo = await validate();
        let {err} = userInfo;
        this.setState({
            err
        })
    }

    componentDidMount() {
        this.props.queryCart();
    }

    removeCart = (id) => {
        this.props.deleteCart(id);
    }

    render() {
        let {cartList} = this.props;
        return (
            <div>
                <Nav>购物车</Nav>
                <div className="insert">
                    {!this.state.err ? null : <div className="gart">
                        <Link to="/login">
                            <span className="discounts">登录后享受更多优惠</span>
                            <span className="landing">去登录</span>
                            <i className='iconfont icon-qianjin'/>
                        </Link>
                    </div>}
                    {cartList.map((item, index) => {
                        return <Goods product={item} key={index} products={cartList} remove={this.removeCart}/>
                    })}
                    <Settlement products={cartList}/>
                </div>
            </div>
        )
    }
}

