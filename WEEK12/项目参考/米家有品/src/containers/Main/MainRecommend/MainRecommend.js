import React, {Component} from "react";
import "./index.less";
import Title from "../common/Title/Title";
import TwoRow from "../common/TwoRow/TwoRow";

export default class MainRecommend extends Component {
    render() {
        let recommend = this.props.recommend;
        let src0 = recommend[0].title;
        let src1 = recommend[0].describe;
        return (
            <div className="cwj-recommend-box">
                {/*头部*/}
                <Title title="有品推荐"/>
                {/**/}
                <div className='recommend-body'>
                    <div className='only-box'>
                        <img src={src0}
                             alt=""/>
                        <img className="tmd"
                             src={src1}
                             alt=""/>
                    </div>
                </div>
                <TwoRow recommend={recommend}/>

            </div>
        )
    }
}
