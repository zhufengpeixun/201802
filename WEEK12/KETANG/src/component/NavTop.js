import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class NavTop extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            我是头部导航
        </div>;
    }
}

export default withRouter(connect()(NavTop));