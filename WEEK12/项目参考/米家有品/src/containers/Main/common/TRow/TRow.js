import React, {Component} from "react";
import "./index.less";

export default class TRow extends Component {
    render() {
        //小米众筹
        let crowdfunding = this.props.crowdfunding;
        //热门组件
        let hotDatas = this.props.homeDatas || [];

        return (
            <div className='t-row-box'>
                {
                    crowdfunding.map((item, index) => {
                            if (index >= 1) {
                                return (
                                    <div className='row-tool' key={index}>
                                        <img alt="1" src={item.url}/>
                                        <div className="t-row-text">
                                            <p className="row-title">
                                                {item.title}
                                            </p>
                                            <span className="row-price">
                                                ￥{item.price}
                    </span>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    )
                }
                {/*首页按需加载组件热门*/}
                {
                    hotDatas.map((item, index) => {
                            if (index < 2) {
                                return (
                                    <div className='row-tool' key={index}>
                                        <img alt="1" src={item.url}/>
                                        <div className="t-row-text">
                                            <p className="row-title">
                                                {item.title}
                                            </p>
                                            <span className="row-price">
                                                ￥{item.price}
                    </span>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    )
                }

            </div>
        )
    }
}
