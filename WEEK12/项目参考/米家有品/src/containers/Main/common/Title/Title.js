import React, {Component} from "react";
import "./index.less";

export default class Title extends Component {
    render() {
        return (
            <div className='title-box'>
                <span>{this.props.title}</span>
                <a>
                    <span>更多</span>
                    <img src="https://static.home.mi.com/youpin/static/m/res/images/std_right_arrow_gray.png"
                         alt="123"/>
                </a>
            </div>
        )
    }
}
