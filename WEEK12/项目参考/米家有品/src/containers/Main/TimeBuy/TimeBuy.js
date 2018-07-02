import React, {Component} from "react";
import Title from "../common/Title/Title";
import "./index.less";

export default class TimeBuy extends Component {

    render() {
        let limit = this.props.limit;

        return (
            <div className="cwj-time-buy">
                <Title title="限时购" time={"123"}/>
                <div className="timer-group">
                    {/**/}
                    {
                        limit.map((item, index) => (
                            <div className="timer-group-item" key={index}>
                                <div className="timer-container">
                                    <div className="timer-container-title marl">
                                        <p>{item.title}</p>
                                    </div>
                                    <div className="timer-container-remaining marl">
                                        <div className="remaining-box">
                                            <div className='div' style={{
                                                width: item.soldnum / item.ratednum * 100
                                            }}>
                                                <div className="remaining">

                                                </div>
                                            </div>
                                        </div>
                                        <span style={{fontSize: ".09rem"}}>{item.soldnum / item.ratednum * 100}%</span>
                                    </div>
                                    <div className="timer-container-price marl">
                                        <span className="container-price-num"> ￥{item.price} <span
                                            className="out-line"> ￥{item.oprice}</span></span>
                                    </div>
                                    <div className="timer-container-img">
                                        <img src={item.url} alt=""/>
                                    </div>

                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        )
    }
}
