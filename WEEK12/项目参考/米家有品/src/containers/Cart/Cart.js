import React from 'react';
import actions from "../../store/actions/cart";
import {connect} from 'react-redux';
import Header from '../../components/Header/Header'
import Unlogin from "./Unlogin";
import {toLogin, toValidate} from '../../api/api';
import './Cart.less';
import Goods from "./Goods";
import Recommend from "./Recommend";
import CartControl from "./CartControl";
import NoGoods from "./NoGoods";


class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            loginState: 1, // 0 是登录状态 1 是未登录状态
            controlState: true // true 是支付状态 false 是删除状态
        }
    }

    async componentDidMount() {
        let loginState = await toValidate();
        this.setState({
            loginState: loginState.err
        }, async () => {
            if (this.state.loginState === 0) {
                await this.props.getDetailCartAPI();
            }
        });
    }

    changeControlState = () => {
        this.setState({
            controlState: !this.state.controlState
        })
    };

    render() {
        return (
            <div>
                <Header back={true}>购物车</Header>
                {
                    this.state.controlState ? <span className='edit' onClick={this.changeControlState}>编辑</span> :
                        <span className='finish' onClick={this.changeControlState}>完成</span>
                }

                {
                    this.state.loginState ?
                        <Unlogin/> :
                        <div className='contented'>
                            {
                                !this.props.cart.detailCart.length ? <NoGoods/> : null
                            }
                            {/*<Goods goods={this.props.cart.userCart}/>*/}
                            <Goods status={this.state.controlState}/>
                            <Recommend recommend={this.props.cart.recommend}/>
                            {
                                this.props.cart.detailCart.length ?
                                    <CartControl detailGoods={this.props.cart.detailCart}
                                                 status={this.state.controlState}/> :
                                    null
                            }
                        </div>
                }
            </div>
        )
    }
}

export default connect(state => ({...state}), actions)(Cart);