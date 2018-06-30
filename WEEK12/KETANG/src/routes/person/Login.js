import React from 'react';
import {connect} from 'react-redux';

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            登录
        </div>;
    }
}

export default connect()(Login);