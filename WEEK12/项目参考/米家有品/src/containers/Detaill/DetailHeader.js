import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../../store/actions/detail/detail'

class DetailHeader extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.getDetailAPI(this.props.index);
    }

    render() {
        let {url, title, describe, from, price} = this.props;
        let smallPrice = price - 200;
        let bigPrice = price - 10;
        return (
            <div>
                <div className="detail clearfix">
                    <div className="detail_top">
                        <img src={url} alt=""/>
                        <div className='left'>
                            <span>限时购 ￥{price > 500 ? smallPrice : bigPrice}</span>
                        </div>
                        <div className="right">
                            <img
                                src="https://static.home.mi.com/youpin/static/m/res/images/std_bigtrap_normal_rightArrow.png"
                                alt=""/>
                            <span className="year">年货节</span>
                        </div>
                        <div className="shop">
                            <img
                                src="https://shop.io.mi-img.com/app/shop/img?id=shop_679ccf34e5fbfe05a96557e4f1247890.png&w=320&h=320"
                                alt=""/>
                        </div>
                    </div>
                    <div className='img1' onClick={this.props.handBack}></div>
                    <div className="img2" onClick={this.props.handHome}></div>
                </div>
                <div className="detail_jieshao clearfix">
                    <h4>{title}</h4>
                    <p><span>【{from}】</span>{describe}</p>
                    <strong>￥{price}</strong>
                </div>

                <div>
                    <div className="detail_yixuan clearfix">
                        <span>已选：<b>请选择颜色 型号 分类</b></span>
                        <img src="https://static.home.mi.com/youpin/static/m/res/images/device_shop_moreData.png"
                             alt=""/>
                    </div>

                    <div className="detail_songzhi clearfix">
                        <span>送至：<b>北京市海淀区</b></span>
                        <img src="https://static.home.mi.com/youpin/static/m/res/images/device_shop_moreData.png"
                             alt=""/>
                    </div>

                    <div className="detail_shouhou clearfix">
                <span>
                    <img src="https://static.home.mi.com/youpin/static/m/res/images/promise_icon.png" alt=""/>
                    有品甄选精品
                </span>
                        <span>
                    <img src="https://static.home.mi.com/youpin/static/m/res/images/promise_icon.png" alt=""/>
                            {price > 150 ? '单笔满150元免运费' : '单笔不满150收取10元运费'}
                </span>
                        <span>
                    <img src="https://static.home.mi.com/youpin/static/m/res/images/promise_icon.png" alt=""/>
                    由 小米 发货并提供售后
                </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({...state.detail}), {...actions})(DetailHeader);