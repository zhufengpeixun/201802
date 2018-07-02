import React, {Component} from 'react';
import './productList.less';
import HighOrderProduct from "./HighOrderProduct/HighOrderProduct";

export default class ProductList extends Component {

    render() {
        let {list, imgList, flag} = this.props;
        return (
            <div className={flag ? 'list-noborder' : 'product-list'}>
                {flag ? <div className="divider-line"/> : null}
                {imgList ? <img src={imgList[0]} className="landscape-img"/> : null}
                {list.map((item, index) => (
                    <HighOrderProduct product={item} key={index} flag={this.props.flag}/>
                ))}
                {imgList ? <img src={imgList[1]} className="landscape-img"/> : null}
            </div>
        )
    }
}
