import React, {Component} from "react";
import "../../containers/Cart/common/DialogCart.less";

export default class DialogCart extends Component {
    render() {
        let {ifShow, text} = this.props;
        return (
            <div style={this.props.ifShow == "block" ? {display: "block"} : {display: "none"}}
                 className="wj-dialog-cart"><p>{this.props.text}</p>
            </div>
        )
    }
}
