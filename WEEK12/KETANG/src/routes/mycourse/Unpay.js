import React from 'react';
import {connect} from 'react-redux';
import action from '../../store/action/index';
import CourseItem from './CourseItem';
import {Alert} from 'antd';

class Unpay extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {unpay} = this.props.shopCart;
        if (unpay.length === 0) {
            return <Alert description='当前还没有购买任何课程，快去购买吧' type='warning' style={{marginTop: '.2rem'}}/>
        }
        return <ul className='courseItem'>
            {unpay.map((item, index) => {
                return <CourseItem key={index} item={item}/>;
            })}
        </ul>;
    }
}

export default connect(state => state.course, action.course)(Unpay);