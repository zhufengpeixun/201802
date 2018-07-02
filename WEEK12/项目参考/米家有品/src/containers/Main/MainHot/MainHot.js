import React, {Component} from "react";
import "./index.less";
import Title from "../common/Title/Title";
import TRow from "../common/TRow/TRow";
import ThreeRow from "../common/ThreeRow/ThreeRow";

export default class MainHot extends Component {
    render() {
        let homeDatas = this.props.homeLoaderData;
        // console.log(homeDatas);
        return (
            <div className='cwj-main-hot-box'>
                <Title title="热门"/>
                <TRow crowdfunding={[]} homeDatas={homeDatas}/>
                <ThreeRow homeDatas={homeDatas}/>
            </div>
        )
    }
}
