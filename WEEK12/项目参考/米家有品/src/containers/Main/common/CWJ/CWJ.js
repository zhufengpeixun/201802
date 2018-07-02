import React, {Component} from "react"
import "./CWJ.less"
import {Link} from "react-router-dom"

export default class CWJ extends Component {
    render() {
        let phone = this.props.phone;
        phone = phone.slice(1);
        if (phone.length >= 1) {
            return (
                <div className="wj-product-list-big">
                    <ul>
                        {
                            phone.map((item, index) => (
                                <li key={index}>
                                    <Link to={{pathname: `/detail/${item.gid}`}}>
                                        <div className="wj-product-list-top">
                                            <div>
                                                <img src={item.url} alt=""/>
                                            </div>
                                            <p>{item.describe}
                                            </p>
                                        </div>
                                        <div className="wj-product-list-bot">
                                            <p>{item.title}</p>
                                            <p>￥<span>{item.price}</span></p>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            )
        }
        return null;
        //   (
        //   <div className="wj-product-list-big">
        //     <ul>
        //       <li>
        //         <div className="wj-product-list-top">
        //           <div>
        //             <img src="https://shop.io.mi-img.com/app/shop/img?id=shop_161ef7ab3c463bb7de4dae3fad140a74.jpeg" alt=""/>
        //           </div>
        //           <p>8秒快速出汁，三重联锁设计</p>
        //         </div>
        //
        //         <div className="wj-product-list-bot">
        //           <p>便携式果蔬料理机</p>
        //           <p>￥<span>179</span><em>直降</em></p>
        //         </div>
        //       </li>
        //
        //       <li>
        //         <div className="wj-product-list-top">
        //           <div>
        //             <img src="https://shop.io.mi-img.com/app/shop/img?id=shop_161ef7ab3c463bb7de4dae3fad140a74.jpeg" alt=""/>
        //           </div>
        //           <p>8秒快速出汁，三重联锁设计</p>
        //         </div>
        //
        //         <div className="wj-product-list-bot">
        //           <p>便携式果蔬料理机</p>
        //           <p>￥<span>179</span><em>直降</em></p>
        //         </div>
        //       </li>
        //
        //       <li>
        //         <div className="wj-product-list-top">
        //           <div>
        //             <img src="https://shop.io.mi-img.com/app/shop/img?id=shop_161ef7ab3c463bb7de4dae3fad140a74.jpeg" alt=""/>
        //           </div>
        //           <p>8秒快速出汁，三重联锁设计</p>
        //         </div>
        //
        //         <div className="wj-product-list-bot">
        //           <p>便携式果蔬料理机</p>
        //           <p>￥<span>179</span><em>直降</em></p>
        //         </div>
        //       </li>
        //
        //       <li>
        //         <div className="wj-product-list-top">
        //           <div>
        //             <img src="https://shop.io.mi-img.com/app/shop/img?id=shop_161ef7ab3c463bb7de4dae3fad140a74.jpeg" alt=""/>
        //           </div>
        //           <p>8秒快速出汁，三重联锁设计</p>
        //         </div>
        //
        //         <div className="wj-product-list-bot">
        //           <p>便携式果蔬料理机</p>
        //           <p>￥<span>179</span><em>直降</em></p>
        //         </div>
        //       </li>
        //     </ul>
        //   </div>
        // )
    }
}