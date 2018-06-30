import React from 'react';
import {connect} from 'react-redux';

class Mycourse extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            我的课程
        </div>;
    }
}

export default connect()(Mycourse);