import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../../store/actions/cart';
import {changeAllSelect, changeDelAllState, delCartData} from "../../api/api";

class CartControl extends React.Component {
    changeAllIsSelect = async (e) => {
        let {status} = e.target.dataset;
        if (status === 'true') status = true;
        if (status === 'false') status = false;
        status = !status;
        await changeAllSelect(status);
        await this.props.getDetailCartAPI();
    };

    changeAllDelState = async (e) => {
        let {status} = e.target.dataset;
        if (status === 'true') status = true;
        if (status === 'false') status = false;
        status = !status;
        await changeDelAllState(status);
        await this.props.getDetailCartAPI();
    };

    clearCart = async () => {
        await delCartData();
        await this.props.getDetailCartAPI();
    };

    render() {
        let {detailGoods} = this.props;
        let curState = detailGoods.every(item => item.isSelected);
        let delState = detailGoods.every(item => item.delState);
        detailGoods = detailGoods.filter(item => item.isSelected);
        let payLength = detailGoods.reduce((prev, next) => {
            return prev + next.number;
        }, 0);
        let totalPrice = detailGoods.reduce((prev, next) => {
            return prev + next.price * next.number;
        }, 0);
        totalPrice = totalPrice.toFixed(2).split('.');
        return (
            <div className='cart_control'>
                <div className='con_inner'>
                    <div className='all_select'>
                        {
                            this.props.status ?
                                <i className={curState ? 'select_state' : 'select_state cancel'}
                                   data-status={curState}
                                   onClick={this.changeAllIsSelect}>
                                </i> :
                                <i className={delState ? 'select_state' : 'select_state cancel'}
                                   data-status={delState}
                                   onClick={this.changeAllDelState}>
                                </i>
                        }
                        <span>全选</span>
                    </div>
                    {
                        this.props.status ?
                            (
                                <div className='total'>
                                    合计： <span className='total_price'>￥{totalPrice[0]}<b>.{totalPrice[1]}</b></span>
                                </div>
                            ) :
                            null
                    }
                    {
                        this.props.status ?
                            <Link to='/pay'>去结算({payLength})</Link> :
                            <span className='del_btn' onClick={this.clearCart}>删除所选</span>
                    }
                </div>
            </div>
        )
    }
}

export default connect(state => ({...state}), actions)(CartControl);
