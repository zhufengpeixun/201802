import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../store/actions/computer';
import ProductList from "../../../components/ProductList/ProductList";
import Slider from "../../../components/Slider/Slider";

@connect(state => {
    return {...state}
}, actions)
export default class Computer extends Component {

    componentDidMount() {
        this.props.queryComputers();
        this.props.queryComputerImg();
    }

    render() {
        let {list, imgList} = this.props.computer;
        return (
            <div className="content">
                <Slider type="computer"/>
                <div className='product-box'>
                    {Object.keys(list).map((key, index) => (
                        <ProductList type={key}
                                     key={index}
                                     category="computer"
                                     list={list[key]}
                                     imgList={imgList[key]}/>
                    ))}
                </div>
            </div>
        )
    }
}