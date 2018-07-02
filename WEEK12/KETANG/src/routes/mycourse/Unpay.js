import React from 'react';
import {connect} from 'react-redux';
import action from '../../store/action/index';
import CourseItem from './CourseItem';

class Unpay extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <ul className='courseItem'>
            {this.props.shopCart.unpay.map((item, index) => {
                return <CourseItem key={index} item={item}/>;
            })}
        </ul>;
    }
}

export default connect(state => state.course, action.course)(Unpay);