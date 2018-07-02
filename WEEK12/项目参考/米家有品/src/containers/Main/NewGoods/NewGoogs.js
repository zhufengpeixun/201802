import React, {Component} from "react";
import OnlyRow from "../common/OnlyRow/OnlyRow";
import ThreeRow from "../common/ThreeRow/ThreeRow";
import Title from "../common/Title/Title";

export default class NewGoogs extends Component {
    render() {

        let newGoods = this.props.newGoods;
        // console.log(newGoods);
        return (
            <div>
                <Title title="新品"/>
                <OnlyRow newGoods={newGoods}/>
                <ThreeRow newGoods={newGoods}/>
            </div>
        )
    }
}
