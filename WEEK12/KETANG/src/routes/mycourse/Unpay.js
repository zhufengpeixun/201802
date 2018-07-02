import React from 'react';
import {connect} from 'react-redux';
import action from '../../store/action/index';
import CourseItem from './CourseItem';
import {Alert, Button} from 'antd';
import {removeShopCart, payShopCart} from '../../api/course';
import {checkLogin} from '../../api/person';

class Unpay extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {unpay} = this.props.shopCart;
        if (unpay.length === 0) {
            return <Alert description='当前还没有购买任何课程，快去购买吧' type='warning' style={{marginTop: '.2rem'}}/>
        }

        return <div>
            <div style={{
                marginTop: '.2rem',
                height: '.7rem',
                lineHeight: '.7rem',
                padding: '0 .1rem'
            }}>
                <input type="checkbox" checked={this.props.selectAll}
                       onChange={this.props.handleSelect.bind(this, 'all')}/>
                全选/全不选
                <Button type='dashed' onClick={this.handleRemove}>删除</Button>
                <Button type='dashed' onClick={this.handlePay}>支付</Button>
            </div>
            <ul className='courseItem'>
                {unpay.map((item, index) => {
                    return <CourseItem key={index} item={item} input={true}/>;
                })}
            </ul>
        </div>;
    }

    handleRemove = () => {
        //=>获取所有被选中的课程ID
        let selectIDList = [];
        this.props.shopCart.unpay.forEach(item => {
            if (item.check) {
                selectIDList.push(item.id);
            }
        });
        if (selectIDList.length === 0) {
            alert('没有要被删除的信息!');
            return;
        }
        //=>根据ID发送删除的请求：生成每一个AXIOS删除操作的返回PROMISE数组，基于Promise.all验证是否都完成
        selectIDList = selectIDList.map(courseID => {
            return removeShopCart(courseID);
        });
        Promise.all(selectIDList).then(() => {
            this.props.queryUnpay();//=>DISPATCH
        });
    }

    handlePay = async () => {
        //=>验证当前是否登录
        let result = await checkLogin();
        if (parseFloat(result.code) !== 0) {
            alert('请先登录');
            return;
        }

        //=>获取所有被选中的存储ID
        let selectIDList = [];
        this.props.shopCart.unpay.forEach(item => {
            if (item.check) {
                selectIDList.push(item.storeID);
            }
        });
        if (selectIDList.length === 0) {
            alert('没有要被删除的信息!');
            return;
        }
        //=>根据ID发送删除的请求：生成每一个AXIOS删除操作的返回PROMISE数组，基于Promise.all验证是否都完成
        selectIDList = selectIDList.map(storeID => {
            return payShopCart(storeID);
        });
        Promise.all(selectIDList).then(() => {
            this.props.queryUnpay();//=>DISPATCH
            this.props.queryPay();
        });
    }
}

export default connect(state => state.course, action.course)(Unpay);