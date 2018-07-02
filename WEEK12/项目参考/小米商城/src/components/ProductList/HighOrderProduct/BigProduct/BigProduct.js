import React from 'react';
import {Link} from 'react-router-dom';
import './bigProduct.less'

export default class BigProduct extends React.Component {

    render() {
        let {product} = this.props;
        //flag为true:表示没有红色边框，优惠图标是矩形位于左上角
        let {flag} = this.props;
        return (
            <div className='product-big'>
                <Link to={{pathname: `/commodity/detail/${product.id}`}} className={flag ? 'noborder' : ''}>
                    <div className="product-imgBox">
                        <img src={product.imgUrl} alt=""/>
                        <img src={product.discount}
                             className={flag ? ' discount-img-square' : 'discount-img-circle'}/>
                    </div>
                    {product.title ? <div className="product-info">
                        <div className="info-left">
                            <span className="info-title">{product.title}</span>
                            <p className="info-desc">{product.desc}</p>
                        </div>
                        <div className="info-right">
                            <div className="info-price">
                                <span>{'￥' + product.curPrice}</span>
                                {product.price !== product.curPrice ?
                                    <span className="prev-price">￥<s>{product.price}</s></span> : null}

                            </div>
                            {flag ? null : <button className="buybtn">立即购买</button>}
                        </div>
                    </div> : null}
                </Link>
            </div>
        )
    }
}