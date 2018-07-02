import React, {Component} from "react";
import "./DialogCart.less";

export default class DialogCart extends Component {
    render() {
        let {ifShow, text} = this.props;
        return (
            <div style={ifShow ? {display: "block"} : {display: "none"}} className="dialog-cart">
                <p>{text}</p>
            </div>
        )
    }
}

