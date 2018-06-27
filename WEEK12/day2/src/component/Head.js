import React from 'react';
import {connect} from 'react-redux';
import action from '../store/action';

class Head extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='panel-heading'>
            <h3 className='panel-title'>
                任务列表 [ 当前未完成的任务数 <span className='count'>0</span> ]
            </h3>
            <input type="text" className='form-control' placeholder='please enter the tasks to be completed'/>
        </div>;
    }
}

export default connect(state => ({...state.todo}), action.todo)(Head);