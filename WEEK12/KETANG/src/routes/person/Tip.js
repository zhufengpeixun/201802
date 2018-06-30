import React from 'react';
import {connect} from 'react-redux';
import {Alert, Button} from 'antd';
import {withRouter} from 'react-router-dom';

class Tip extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            <Alert type='warning' message='未登录提醒' description='尊敬的用户，您当前还没有登录，登录后才可以查看个人信息！'/>
            <Button type='dashed' onClick={ev => {
                this.props.history.push('/person/login');
            }}>立即登录</Button>
            <Button type='dashed' onClick={ev => {
                this.props.history.push('/person/register');
            }}>立即注册</Button>
        </div>;
    }
}

export default withRouter(connect()(Tip));