import React from 'react';
import {connect} from 'react-redux';
import action from '../../store/action';

class VoteHandle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {support, against} = this.props;
        return <div className='panel-footer'>
            <button className='btn btn-success' onClick={support}>支持
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button className='btn btn-danger' onClick={against}>反对
            </button>
        </div>;
    }
}

export default connect(state => ({...state.vote}), action.vote)(VoteHandle);