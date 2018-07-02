import React, {Component} from "react";
import "./index.less";
import Title from "../common/Title/Title";
import OnlyRow from "../common/OnlyRow/OnlyRow";
import CWJ from "../common/CWJ/CWJ";
import OneRow from "../common/OneRow/OneRow";

export default class MainPhone extends Component {
    render() {
        let phone = this.props.phone;

        return (
            <div className="cwj-Phone-box">
                <Title title={"手机"}/>
                <OneRow phone={phone}/>
                <CWJ phone={phone}/>
            </div>
        )
    }
}
