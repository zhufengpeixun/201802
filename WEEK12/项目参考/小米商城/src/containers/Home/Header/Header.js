import React, {Component} from 'react';
import TabHeader from "./TabHeader/TabHeader";
import Search1 from "./Search1/Search1";

export default class Header extends Component {
    render() {
        return (
            <div>
                <Search1/>
                <TabHeader/>
            </div>
        )
    }
}