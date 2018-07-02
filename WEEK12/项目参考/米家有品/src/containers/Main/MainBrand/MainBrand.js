import React, {Component} from "react";
import Title from "../common/Title/Title";
import "./index.less";

export default class MainBrand extends Component {
    render() {
        let brand = this.props.brand;
        return (
            <div className="cwj-brand-box">
                <Title title={"品牌"}/>
                <div className="brand-img-box">
                    {
                        brand.map((item, index) => (
                            <div className="brand-img" key={index}>
                                <img src={item.url} alt=""/>
                            </div>
                        ))
                    }
                    {/*<div className="brand-img">*/}
                    {/*<img src="https://static.home.mi.com/app/shop/img?id=shop_54e499c796696b4729d09fef6fd265ac.jpeg&w=453&h=429&t=webp" alt=""/>*/}
                    {/*</div>*/}
                    {/*<div className="brand-img">*/}
                    {/*<img src="https://static.home.mi.com/app/shop/img?id=shop_1a3e852b84897e0eca965fbc8c0ecf56.jpeg&w=453&h=429&t=webp" alt=""/>*/}
                    {/*</div>*/}
                    {/*<div className="brand-img">*/}
                    {/*<img src="https://static.home.mi.com/app/shop/img?id=shop_3d84b8c77e98ab7f329feaa4bf59a1be.jpeg&w=453&h=429&t=webp" alt=""/>*/}
                    {/*</div>*/}
                    {/*<div className="brand-img">*/}
                    {/*<img src="https://static.home.mi.com/app/shop/img?id=shop_54e499c796696b4729d09fef6fd265ac.jpeg&w=453&h=429&t=webp" alt=""/>*/}
                    {/*</div>*/}
                    {/*<div className="brand-img">*/}
                    {/*<img src="https://static.home.mi.com/app/shop/img?id=shop_54e499c796696b4729d09fef6fd265ac.jpeg&w=453&h=429&t=webp" alt=""/>*/}
                    {/*</div>*/}

                </div>
            </div>
        )
    }
}
