import React, {Component} from 'react';
import Refer from "./Refer/Refer";
import Smart from "./Smart/Smart";
import TV from "./TV/TV";
import Phone from "./Phone/Phone";
import Living from "./Living/Living";
import Box from "./Box/Box";
import Art from "./Art/Art";
import Computer from "./Computer/Computer";

export default class HighOrderRender extends Component {
    render() {
        let component = this.props.match.params.id;
        switch (component) {
            case 'refer':
                return <Refer/>;
            case 'smart':
                return <Smart/>;
            case 'tv':
                return <TV/>;
            case 'phone':
                return <Phone/>;
            case 'living':
                return <Living/>;
            case 'computer':
                return <Computer/>;
            case 'box':
                return <Box/>;
            case 'art':
                return <Art/>;
            default:
                return <Smart/>
        }
    }
}