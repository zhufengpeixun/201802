import React, {Component} from "react";
import "./index.less";
import Title from "../common/Title/Title";
import TRow from "../common/TRow/TRow";

export default class MainCrowdfunding extends Component {
    render() {
        let crowdfunding = this.props.crowdfunding || [];

        return (
            <div className="cwj-crowd-funding-box">
                <Title title="小米众筹"/>
                <TRow crowdfunding={crowdfunding}/>
                <div className="crowd-funding-footer">
                    {
                        crowdfunding.map((item, index) => {
                            if (index >= 1) {
                                return (
                                    <div className="statistical" key={index}>
                                        <span><i>{item.actualPerson}</i>人参与</span>
                                        <span>爆</span>
                                        <span><i>{item.actualPerson}%</i></span>
                                    </div>
                                )
                            }

                        })
                    }
                </div>
            </div>
        )
    }
}
