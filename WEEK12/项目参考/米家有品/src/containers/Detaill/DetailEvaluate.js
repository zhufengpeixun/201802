import React, {Component} from 'react'
import {connect} from "react-redux";
import actions from "../../store/actions/detail/evaluate";

class DetailEvaluate extends Component {
    componentDidMount() {
        this.props.getEvaluateAPI('100907');
    }

    render() {
        return (
            <div>
                <div className="detail_user clearfix">
                    <ul>
                        {this.props.list.map((item, index) => (
                            <li key={index}>
                                <div className="user_outer">
                                    <img src={item.userImg} alt=""/>
                                    <span className="span1">{item.username}</span>
                                    <span className="span2">{item.time}</span>
                                </div>
                                <div className="p">
                                    {item.text}
                                </div>
                                <div className="detail_hengxian"></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(state => ({...state.evaluate}), actions)(DetailEvaluate);