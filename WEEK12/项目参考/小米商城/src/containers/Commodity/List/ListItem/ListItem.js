import React, {Component} from 'react';
import './listItem.less';
import {Link} from 'react-router-dom';

export default class ListItem extends Component {
    render() {
        let {product} = this.props;
        return (
            <Link to={`/commodity/detail/${product.id}`} className="product-item">
                <div className="img-box">
                    <img src={product.imgUrl}/>
                </div>
                <div className="product-info">
                    <span className="product-title">{product.title}</span>
                    <div className="product-desc">{product.desc}</div>
                    <span className="product-price">{'￥' + product.curPrice}</span>
                </div>
            </Link>
        )
    }
}