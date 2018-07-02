import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../store/actions/refer'
import Slider from "../../../components/Slider/Slider";
import SmallProduct from "../../../components/ProductList/HighOrderProduct/SmallProduct/SmallProduct";
import BigProduct from "../../../components/ProductList/HighOrderProduct/BigProduct/BigProduct";
import './refer.less';

@connect(state => ({...state}), actions)
export default class Refer extends Component {
    componentDidMount() {
        this.props.queryCommends();
        this.props.queryCommendsImg();
    }

    render() {
        let {list, imgList} = this.props.refer;
        //  console.log(imgList);
        return (
            <div className="content">
                <Slider type="commend"/>
                <div className="cells_auto_fill multi_cell">
                    <a href="#"><img
                        src="https://i8.mifile.cn/v1/a1/594dec83-b317-175c-1916-e73c591452b7!180x152.webp"/></a>
                    <a href="#"><img
                        src="https://i8.mifile.cn/v1/a1/82d92b9e-63fa-16d5-2a37-a1675c72351a!180x152.webp"/></a>
                    <a href="#"><img
                        src="https://i8.mifile.cn/v1/a1/0437c9f2-dfba-a19f-d8d6-472e107bc4ca!180x152.webp"/></a>
                    <a href="#"><img
                        src="https://i8.mifile.cn/v1/a1/6b06addd-6460-aa48-bdb2-043292b3d141!180x152.webp"/></a>
                </div>
                <div className="cells_auto_fill multi_cell2">
                    <div className="shadow">
                        <a href=""><img className="items1"
                                        src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/b777b153e8626bc4d8e0da5358207199.jpg?thumb=1&w=358&h=508"/></a>
                        <a href=""><img className="items2"
                                        src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/f1bbadfc156ffebe8c6dd2857e469e8e.jpg?thumb=1&w=358&h=252"/></a>
                        <a href=""><img className="items2"
                                        src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/5ce701888638804c3c05817f934a0f46.jpg?thumb=1&w=358&h=252"/></a>
                    </div>
                </div>
                <div className="cells_auto_fill">
                    {Object.keys(list).length > 0 ? Object.keys(list).map((key, index) => (
                        <div key={index}>
                            <img src={imgList[key] && (imgList[key])[0]} className="landscape-img"/>
                            <img src={imgList[key] && (imgList[key])[1]} className="landscape-img"/>
                            {imgList[key] && Object.keys(imgList[key]).map((item, num) => (
                                <BigProduct product={item}
                                            key={num}
                                            flag/>
                            ))}
                            {list[key].map((item, num) => (
                                <SmallProduct product={item}
                                              key={num}
                                              flag/>
                            ))}
                        </div>
                    )) : null}
                    <img className="bottom-img"
                         src="https://i8.mifile.cn/v1/a1/31676eb7-a4d0-2444-cbba-bef66acbb897!720x280.webp" alt=""/>
                </div>
            </div>
        )
    }
}