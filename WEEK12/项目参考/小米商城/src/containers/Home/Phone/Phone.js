import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../store/actions/phone'
import BigProduct from "../../../components/ProductList/HighOrderProduct/BigProduct/BigProduct";

@connect(state => ({...state}), actions)
export default class Phone extends Component {
    componentDidMount() {
        this.props.queryPhoneImg();
        this.props.queryPhones();
    }

    render() {
        let {list, imgList} = this.props.phone;
        return (
            <div className="content">
                <img
                    src="//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/2d8240bded005c0ac075d3158788e794.jpg?thumb=1&w=720&h=360"
                    className="landscape-img"/>
                {Object.keys(list).length > 0 ? Object.keys(list).map((key, index) => (
                    <div key={index}>
                        <img src={imgList[key] && (imgList[key])[0]} className="landscape-img"/>
                        {list[key].map((item, num) => (
                            <BigProduct product={item}
                                        key={num}
                                        flag/>
                        ))}
                    </div>
                )) : null}
            </div>
        )
    }
}