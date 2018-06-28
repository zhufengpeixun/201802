import React from 'react';
import {connect} from 'react-redux';

class Custom extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>

        </div>;
    }
}

export default connect()(Custom);