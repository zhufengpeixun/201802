import React, {Component} from 'react';
import BigProduct from "./BigProduct/BigProduct";
import SmallProduct from "./SmallProduct/SmallProduct";

export default class HighOrderProduct extends Component {
    render() {
        let {product} = this.props;
        let {shape} = product;
        return shape ? <BigProduct product={product} flag={this.props.flag}/> :
            <SmallProduct product={product} flag={this.props.flag}/>
    }
}