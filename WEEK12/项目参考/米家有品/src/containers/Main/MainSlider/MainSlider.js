import React, {Component} from "react";
import {Carousel} from 'antd';
import "./index.less";

export default class MainSlider extends Component {
    render() {
        //轮播图数据
        let sliders = this.props.sliders;
        return (
            <div className="cwj-slider-box">
                <Carousel autoplay
                          dots={false}>
                    {
                        sliders.map((item, index) => (
                            <div key={index}>
                                <img className='slider-img'
                                     src={item.url}
                                     alt=""/>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        )
    }
}
