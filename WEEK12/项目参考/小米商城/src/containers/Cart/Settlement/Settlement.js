import React, {Component} from 'react';
import "./settlement.less";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../../../store/actions/cart';

@connect(state => ({...state.cart}), actions)
export default class Settlement extends Component {
    render() {
        let {cartList} = this.props;
        let totalPrice = cartList.reduce((prev, next) => {
            return prev + next.count * next.curPrice;
        }, 0)
        let totalCount = cartList.reduce((prev, next) => {
            return prev + next.count;
        }, 0)
        return (
            <div className="footer">
                <div className="amount">
                    <span className='money'>共{totalCount}件 金额：</span>
                    <br/>
                    <strong className="money-1">{totalPrice}</strong>
                    <span className='money-2'>元</span>
                </div>
                <Link to="/category" className='shopping-go'>继续购物</Link>
                <a href="javascript:;" className='shopping-count'>去结算</a>
            </div>
        )
    }
}