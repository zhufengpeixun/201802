import React, {Component} from "react";
import "./index.less";

export default class ThreeRow extends Component {
    render() {

        //热门组件
        let hotDatas = this.props.homeDatas || [];
        let newGoods = this.props.newGoods || [];
        if (hotDatas.length > 0) {
            return (
                <div className="three-row-box">
                    <div className='three-row'>
                        <img src={hotDatas[2].url} alt=""/>
                        <div className="t-row-text">
                            <p className="row-title">
                                {hotDatas[2].title}
                            </p>
                            <p className="row-alt">
                                {hotDatas[2].describe}
                            </p>
                            <span className="row-price"> ￥{hotDatas[2].price}</span>
                        </div>

                    </div>
                    {/*you*/}
                    <div className='three-row'>
                        <div className='row-tool'>
                            <img alt=""
                                 src={hotDatas[3].url}/>
                            <div className="t-row-text">
                                <p className="row-title">
                                    {hotDatas[3].title}
                                </p>
                                <span className="row-price">
                ￥{hotDatas[3].price}
                </span>

                            </div>
                        </div>
                        <div className='row-tool'>
                            <img alt=""
                                 src={hotDatas[4].url}/>
                            <div className="t-row-text">
                                <p className="row-title">
                                    {hotDatas[4].title}
                                </p>
                                <span className="row-price">
                ￥{hotDatas[4].price}
                </span>

                            </div>
                        </div>
                    </div>

                </div>
            )
        } else if (newGoods.length > 0) {
            return (
                <div className="three-row-box">
                    <div className='three-row'>
                        <img src={newGoods[1].url}/>
                        <div className="t-row-text">
                            <p className="row-title">
                                {newGoods[1].title}
                            </p>
                            <p className="row-alt">
                                {newGoods[1].describe}
                            </p>
                            <span className="row-price"> ￥{newGoods[1].price}</span>
                        </div>

                    </div>
                    {/*you*/}
                    <div className='three-row'>
                        <div className='row-tool'>
                            <img alt=""
                                 src={newGoods[2].url}/>
                            <div className="t-row-text">
                                <p className="row-title">
                                    {newGoods[2].title}
                                </p>
                                <span className="row-price">
                ￥{newGoods[2].price}
                </span>

                            </div>
                        </div>
                        <div className='row-tool'>
                            <img alt=""
                                 src={newGoods[3].url}/>
                            <div className="t-row-text">
                                <p className="row-title">
                                    {newGoods[3].title}
                                </p>
                                <span className="row-price">
                ￥{newGoods[3].price}
                </span>

                            </div>
                        </div>
                    </div>

                </div>
            )
        }
        return null;

    }
}
