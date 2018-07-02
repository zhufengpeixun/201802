import React from 'react';
import "./logout.less";
import Nav from "../../components/Nav/Nav";
import {connect} from 'react-redux';
import actions from '../../store/actions/session';

@connect(state => ({...state.session}), actions)
export default class Logout extends React.Component {
    render() {
        return (
            <div>
                <Nav>设置</Nav>
                <div className="logout-footer ">
                    <a onClick={() => this.props.toLogout(this.props.history)}>退出账号</a>
                </div>
            </div>)
    }
}