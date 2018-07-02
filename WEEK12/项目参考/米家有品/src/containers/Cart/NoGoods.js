import React from 'react';
import {Link} from 'react-router-dom';

export default class NoGoods extends React.Component {
    render() {
        return (
            <div className='emptyCart'>
                <img src="https://static.home.mi.com/youpin/static/m/res/images/cart_grey.png" alt=""/>
                <div className='context'>
                    <p>购物车还没有商品哦~</p>
                    <Link to='/main'>去逛逛</Link>
                </div>
            </div>
        )
    }
}