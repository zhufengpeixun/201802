import React from 'react';
import {connect} from 'react-redux';
import action from '../../store/action/index';
import CourseItem from './CourseItem';
import {checkLogin} from '../../api/person';
import {Alert} from 'antd';
import {Link} from 'react-router-dom';

class Pay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLogin: false
        };
    }

    async componentDidMount() {
        let result = await checkLogin();
        if (parseFloat(result.code) === 0) {
            this.setState({
                isLogin: true
            });
        }
    }

    render() {
        if (this.state.isLogin === false) {
            return <Link to='/person/login'>
                <Alert type='warning'
                       description='您还未登录，请先登录!（点我登录）'/>
            </Link>;
        }

        let {pay} = this.props.shopCart;
        if (pay.length === 0) {
            return <Alert type='warning'
                          description='当前还没有购买任何课程，快去购买吧!'/>;
        }

        return <ul className='courseItem'>
            {pay.map((item, index) => {
                return <CourseItem key={index} item={item}/>;
            })}
        </ul>;
    }
}

export default connect(state => state.course, action.course)(Pay);