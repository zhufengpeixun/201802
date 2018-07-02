import React from 'react';
import actions from '../../store/actions/cart';
import {connect} from 'react-redux';
import {editCartData, changeSelect, changePartSelect, changeDelState, changeDelPartState} from "../../api/api";
import DialogCart from "./common/DialogCart";
import {Link} from 'react-router-dom';

class Goods extends React.Component {
    constructor() {
        super();
        this.state = {ifShow: false, text: ''};
    }

    editCartPlus = async (e) => { // 增加数量
        let {gid, num} = e.target.dataset;
        if (num >= 15) {
            this.setState({
                ifShow: !this.state.ifShow,
                text: '~ 已经是最大数量了 ~'
            }, () => {
                clearTimeout(this.timerOut);
                this.timerOut = setTimeout(() => {
                    this.setState({
                        ifShow: !this.state.ifShow,
                        text: '~ 已经是最大数量了 ~'
                    })
                }, 1500)
            });
            return;
        }
        num = parseInt(num) + 1;
        await editCartData(gid, num);
        await this.props.getDetailCartAPI();
    };

    editCartMinus = async (e) => { // 减少数量
        let {gid, num} = e.target.dataset;
        if (num <= 1) {
            clearTimeout(this.timerOut);
            this.timerOut = this.setState({
                ifShow: !this.state.ifShow,
                text: '~ 已经是最小数量了 ~'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        ifShow: !this.state.ifShow,
                        text: '~ 已经是最小数量了 ~'
                    })
                }, 1500)
            });
            return;
        }
        num = parseInt(num) - 1;
        await editCartData(gid, num);
        await this.props.getDetailCartAPI();
    };

    changeIsSelect = async (e) => {
        let {status, gid} = e.target.dataset;
        if (status === 'true') status = true;
        if (status === 'false') status = false;
        status = !status;
        await changeSelect(gid, status);
        await this.props.getDetailCartAPI();
    };

    changePartIsSelect = async (e) => {
        let {status, from} = e.target.dataset;
        if (status === 'true') status = true;
        if (status === 'false') status = false;
        status = !status;
        await changePartSelect(from, status);
        await this.props.getDetailCartAPI();
    };

    changeDelState = async (e) => {
        let {status, gid} = e.target.dataset;
        if (status === 'true') status = true;
        if (status === 'false') status = false;
        status = !status;
        await changeDelState(gid, status);
        await this.props.getDetailCartAPI();
    };

    changeDelPartIsState = async (e) => {
        let {status, from} = e.target.dataset;
        if (status === 'true') status = true;
        if (status === 'false') status = false;
        status = !status;
        await changeDelPartState(from, status);
        await this.props.getDetailCartAPI();
    };

    render() {
        return (
            <div>
                <DialogCart {...this.state}/>
                {
                    this.props.cart.userCart.map((item, index) => {
                        let partState = item.items.every(item => item.isSelected);
                        let delState = item.items.every(item => item.delState);
                        return (
                            <div className='commodity' key={index}>
                                <div className='com_header'>
                                    {
                                        this.props.status ?
                                            <i className={partState ? `select_state ` : `select_state cancel`}
                                               data-from={item.from}
                                               data-status={partState}
                                               onClick={this.changePartIsSelect}>
                                            </i> :
                                            <i className={delState ? `select_state ` : `select_state cancel`}
                                               data-from={item.from}
                                               data-status={delState}
                                               onClick={this.changeDelPartIsState}>
                                            </i>
                                    }
                                    <span className='com_from'>{item.from}</span>
                                    {
                                        this.props.status ?
                                            (
                                                <div className='com_view'>
                                                    <img
                                                        src="https://static.home.mi.com/youpin/static/m/res/images/icon_cart_post.png"
                                                        alt=""/>
                                                    <span>{item.minfreight ? `满${item.minfreight}元` : '免'}运费</span>
                                                </div>
                                            ) :
                                            null
                                    }
                                </div>
                                <div>
                                    {
                                        item.items.map((eva, index) => {
                                            return (
                                                <div className='com_item' key={index}>
                                                    {
                                                        this.props.status ?
                                                            <i className={eva.isSelected ? 'select_state' : 'select_state cancel'}
                                                               data-status={eva.isSelected}
                                                               data-gid={eva.gid}
                                                               onClick={this.changeIsSelect}>
                                                            </i> :
                                                            <i className={eva.delState ? 'select_state' : 'select_state cancel'}
                                                               data-status={eva.delState}
                                                               data-gid={eva.gid}
                                                               onClick={this.changeDelState}>
                                                            </i>
                                                    }
                                                    <div className='reset_flex'>
                                                        <Link to={{pathname: `/detail/${eva.gid}`}}>
                                                            <img src={eva.url}/>
                                                        </Link>
                                                        <div className='list_detail'>
                                                            <p>{eva.title}</p>
                                                            <p>小计：{(eva.price * eva.number).toFixed(2)}元</p>
                                                            <div className='list_detail_operation'>
                                                                <span className='com_price'>￥ {eva.price}</span>
                                                                <div className='com_number'>
                                  <span className='minus'>
                                    <img
                                        src="https://static.home.mi.com/youpin/static/m/res/images/device_shop_cart_count_minus_disable.png"
                                        data-num={eva.number}
                                        data-gid={eva.gid}
                                        onClick={this.editCartMinus}/>
                                  </span>
                                                                    <span className='count'>{eva.number}</span>
                                                                    <span className='plus'>
                                    <img
                                        src="https://static.home.mi.com/youpin/static/m/res/images/device_shop_cart_count_plus_enable.png"
                                        data-num={eva.number}
                                        data-gid={eva.gid}
                                        onClick={this.editCartPlus}/>
                                  </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(state => ({...state}), actions)(Goods);