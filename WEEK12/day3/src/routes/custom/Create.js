import React from 'react';
import {connect} from 'react-redux';
import action from '../../store/action';

class Create extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            用户编号：<input type="text" ref='USER_ID'/>
            <br/><br/>
            用户姓名：<input type="text" ref='USER_NANME'/>
            <br/><br/>
            <button onClick={this.submit}>增加用户</button>
        </div>;
    }

    submit = ev => {
        let {USER_ID, USER_NANME} = this.refs,
            {create, history} = this.props;
        //=>DISPATCH
        create({
            id: USER_ID.value,
            name: USER_NANME.value
        });
        //=>GO LIST
        USER_ID.value = USER_NANME.value = '';
        history.push('/custom/list');
    };
}

export default connect(state => ({...state.custom}), action.custom)(Create);