import React from 'react';
import {Link} from 'react-router-dom';

export default class Unlogin extends React.Component {
    render() {
        return (
            <div className='cartUnlogin'>
                <img src="https://static.home.mi.com/youpin/static/m/res/images/std_shop_details_icon_wrong.png"
                     alt=""/>
                <div className='context'>
                    <p>登录后才能到看购物车商品哦~</p>
                    <Link to='/login'>立即登录</Link>
                </div>
            </div>
        )
    }
}
