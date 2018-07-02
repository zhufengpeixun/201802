import React from 'react';
import {connect} from 'react-redux';
import action from '../../store/action/index';
import CourseItem from './CourseItem';
import {Alert, Button} from 'antd';

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
                <Button type='dashed'>删除</Button>
                <Button type='dashed'>支付</Button>
            </div>
            <ul className='courseItem'>
                {unpay.map((item, index) => {
                    return <CourseItem key={index} item={item}/>;
                })}
            </ul>
        </div>;
    }
}

export default connect(state => state.course, action.course)(Unpay);