import React, {Component} from "react";
import "./index.less";

export default class TwoRow extends Component {
    render() {
        let recommend = this.props.recommend;
        return (
            <div className="two-row-box">
                {
                    recommend.map((item, index) => {
                            if (index >= 1) {
                                return (
                                    <div className='two-row' key={index}>
                                        <img
                                            src={item.url}
                                            alt="3"/>
                                    </div>
                                )
                            }
                        }
                    )
                }
            </div>
        )
    }
}
