import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../store/actions/smart';
import ProductList from "../../../components/ProductList/ProductList";
import Slider from "../../../components/Slider/Slider";

@connect(state => {
    return {...state}
}, actions)
export default class Smart extends Component {
    componentDidMount() {
        this.props.querySmartImg();
        this.props.querySmarts();
    }

    render() {
        let {list, imgList} = this.props.smart;
        return (
            <div className="content">
                <Slider type="smart"/>
                <div>
                    {Object.keys(list).map((key, index) => (
                        <ProductList type={key}
                                     key={index}
                                     category="smart"
                                     list={list[key]}
                                     imgList={imgList[key]}/>
                    ))}
                </div>
            </div>
        )
    }
}