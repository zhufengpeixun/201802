import React, {Component} from 'react';
import Slider from "../../../components/Slider/Slider";
import ProductList from "../../../components/ProductList/ProductList";
import {getLifeData, getLifeImg} from '../../../api/home'

export default class Living extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            imgList: []
        }
    }

    async componentDidMount() {
        let list = await getLifeData();
        let imgList = await getLifeImg();
        this.setState({
            list,
            imgList
        })
    }

    render() {
        let {list, imgList} = this.state;
        return (
            <div className="content">
                <Slider type="life"/>
                <div>
                    {Object.keys(list).map((key, index) => (
                        <ProductList type={key}
                                     key={index}
                                     category="life"
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