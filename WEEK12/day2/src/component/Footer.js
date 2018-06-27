import React from 'react';
import {connect} from 'react-redux';
import action from '../store/action';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='panel-footer'>
            <ul className='nav nav-pills'>
                <li className='presentation active'>
                    <a href='javascript:;'>全部</a>
                </li>

                <li className='presentation'>
                    <a href='javascript:;'>已完成</a>
                </li>

                <li className='presentation'>
                    <a href='javascript:;'>未完成</a>
                </li>
            </ul>
        </div>;
    }
}

export default connect(state => ({...state.todo}), action.todo)(Footer);