import React, {Component} from "react";
import "./index.less";

export default class OnlyRow extends Component {
    render() {
        let newGoods = this.props.newGoods;
        if (newGoods.length > 0) {
            return (
                <div className="cwj-only-box">
                    <div className="only-img">
                        <img
                            src="https://shop.io.mi-img.com/app/shop/img?id=shop_62773943138697b231f77971e210df17.jpeg&w=1080&h=420&t=webp"
                            alt=""/>
                        <img src={newGoods[0].url} alt=""/>
                    </div>
                    <div className="t-row-text">
                        <p className="row-title">
                            {newGoods[0].title}
                        </p>
                        <p className="row-alt">
                            {newGoods[0].describe}
                        </p>
                        <span className="row-price">
                    ￥ {newGoods[0].price}
                    </span>
                    </div>
                </div>
            )
        }
        return null;

    }
}
