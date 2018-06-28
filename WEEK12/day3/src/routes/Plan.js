import React from 'react';
import {connect} from 'react-redux';

class Plan extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            我是计划管理页PLAN
        </div>;
    }
}

export default connect()(Plan);