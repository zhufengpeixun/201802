import React, {Component} from "react";
import Header from "../../components/Header/Header";
import "./index.less";
import axios from "axios";
import {Link} from "react-router-dom"
import Collection from "./Collection";

export default class Collections extends Component {
    constructor() {
        super();
        this.state = {
            collections: {
                backList: []

            }

        }
    }

    componentDidMount() {
        axios.get("/collectionlist").then(res => {
            this.setState({
                collections: res
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        let backList = this.state.collections || [];
        console.log();
        if (backList.backList.length > 0) {
            return (
                <div className="cwj-collection-box cwj-collection-pos">
                    <Header back={true}>
                        我的收藏
                    </Header>
                    {
                        backList.backList.map((item, index) => (
                                <div className="collection-has-data" style={{fontSize: "12px"}} key={index}>
                                    <div className="goods-container">
                                        <Link className="goods-wrrap" to={{pathname: `/detail/${item.gid}`}}>
                                            <img src={item.url} alt=""/>
                                            <div className="goods-text-box">
                                                <span className="goods-title">{item.title}</span>
                                                <span className="goods-price">￥{item.price}</span>
                                            </div>
                                            <img src={item.url} alt=""/>
                                        </Link>
                                    </div>
                                </div>
                            )
                        )
                    }

                </div>
            )

        }
        return <Collection/>


    }
}
