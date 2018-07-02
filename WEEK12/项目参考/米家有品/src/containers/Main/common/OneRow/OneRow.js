import React, {Component} from "react";
import "./index.less";

export default class OneRow extends Component {
    render() {
        let phone = this.props.phone;
        // console.log(phone);
        if (phone.length > 0) {
            return (
                <div className="cwj-one-row">
                    <div className="only-img">
                        <img src={phone[0].url} alt=""/>
                    </div>
                </div>
            )
        }
        return null;

    }
}
