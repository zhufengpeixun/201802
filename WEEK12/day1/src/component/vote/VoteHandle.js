import React from 'react';
import action from '../../store/action';

export default class VoteHandle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='panel-footer'>
            <button className='btn btn-success' onClick={() => {
                this.props.store.dispatch(action.vote.support());
            }}>支持
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button className='btn btn-danger' onClick={() => {
                this.props.store.dispatch(action.vote.against());
            }}>反对
            </button>
        </div>;
    }
}