import React, {Component} from "react";
import "./index.less";

export default class MainLink extends Component {
    render() {
        let activity = this.props.activity;
        return (
            <div className="cwj-link-box">
                {
                    activity.map((item, index) => (
                        <div className='react-view' key={index}>
                            <img src={item.url} alt=""/>
                        </div>
                    ))

                }
                {/*<div className='react-view'>*/}
                {/*<img*/}
                {/*src="https://shop.io.mi-img.com/app/shop/img?id=shop_0a728777f0cbcba5e533d5215a6b2a5c.jpeg&w=270&h=300&t=webp" alt="1"/>*/}
                {/*</div>*/}
                {/*<div className='react-view'>*/}
                {/*<img*/}
                {/*src="https://shop.io.mi-img.com/app/shop/img?id=shop_0a728777f0cbcba5e533d5215a6b2a5c.jpeg&w=270&h=300&t=webp" alt="1"/>*/}
                {/*</div>*/}
                {/*<div className='react-view'>*/}
                {/*<img*/}
                {/*src="https://shop.io.mi-img.com/app/shop/img?id=shop_0a728777f0cbcba5e533d5215a6b2a5c.jpeg&w=270&h=300&t=webp" alt="1"/>*/}
                {/*</div>*/}
                {/*<div className='react-view'>*/}
                {/*<img*/}
                {/*src="https://shop.io.mi-img.com/app/shop/img?id=shop_0a728777f0cbcba5e533d5215a6b2a5c.jpeg&w=270&h=300&t=webp" alt="1"/>*/}
                {/*</div>*/}
                {/*<div className='react-view'>*/}
                {/*<img*/}
                {/*src="https://shop.io.mi-img.com/app/shop/img?id=shop_0a728777f0cbcba5e533d5215a6b2a5c.jpeg&w=270&h=300&t=webp" alt="1"/>*/}
                {/*</div>*/}


            </div>
        )
    }
}
