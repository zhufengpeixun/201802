import React from 'react';
import {connect} from 'react-redux';

class Create extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            用户编号：<input type="text"/>
            <br/><br/>
            用户姓名：<input type="text"/>
            <br/><br/>
            <button>增加用户</button>
        </div>;
    }
}

export default connect()(Create);