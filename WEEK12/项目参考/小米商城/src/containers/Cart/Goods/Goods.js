import React, {Component} from 'react';
import "./goods.less";
import {connect} from 'react-redux';
import actions from '../../../store/actions/cart';

@connect(state => ({...state.cart}), actions)
export default class Goods extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }

    componentWillMount() {
        if (!this.state.count) {
            if (!this.props.product.count) {
                this.setState({
                    count: 1
                })
                return;
            }
            this.setState({
                count: this.props.product.count
            })
        }
    }

    handleAdd = () => {
        this.setState({
            count: this.state.count + 1
        }, () => {
            this.props.updateCart(this.props.product.id, this.state.count);
        })
    }
    handleMinus = () => {
        if (this.state.count === 1) return;
        this.setState({
            count: this.state.count - 1
        }, () => {
            this.props.updateCart(this.props.product.id, this.state.count);
        })
    }

    handleRemove = () => {
        let id = this.props.product.id;
        this.props.remove(id);
    }

    render() {
        let {product} = this.props;
        return (
            <div className='details wrapper'>
                {/*圆圈*/}
                <div className='circle'></div>
                <img className="picture" src={product.imgUrl} alt=""/>
                <div className="info">
                    <span className="details title">{product.title}</span>
                    <span className='price'>{'售价：' + product.curPrice + ' 元'}</span>
                    <div className="price-1">
                        <div>
                            <i className='iconfont icon-minus-bold' onClick={this.handleMinus}>-</i>
                            <span className="amount">{this.state.count}</span>
                            <i className='iconfont icon-jiajianzujianjiahao' onClick={this.handleAdd}>+</i>
                        </div>
                        <i className='iconfont icon-shanchu' onClick={this.handleRemove}></i>
                    </div>
                </div>
            </div>
        )
    }
}
