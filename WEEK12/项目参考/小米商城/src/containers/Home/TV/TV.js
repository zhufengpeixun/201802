import React, {Component} from 'react';
import Slider from "../../../components/Slider/Slider";
import ProductList from "../../../components/ProductList/ProductList";
import {connect} from 'react-redux';
import actions from '../../../store/actions/tv'

@connect(state => ({...state}), actions)
export default class TV extends Component {
    componentDidMount() {
        this.props.queryTVs();
        this.props.queryTVImg();
    }

    render() {
        let {list, imgList} = this.props.tv;
        return (
            <div className="content">
                <Slider type="tv"/>
                <div>
                    {Object.keys(list).map((key, index) => (
                        <ProductList type={key}
                                     key={index}
                                     category="tv"
                                     list={list[key]}
                                     imgList={imgList[key]}
                                     flag
                        />
                    ))}
                </div>
            </div>
        )
    }
}