import React, {Component} from "react";
import Header from "../../components/Header/Header";
import "./index.less";
import {Link} from "react-router-dom"
import CollectionList from "./CollectionList";

export default class Collection extends Component {
    render() {
        return (
            <div className="cwj-collection-box">
                <Header back={true}>
                    我的收藏
                </Header>
                <div className="collection-box">
                    <CollectionList/>
                    <div className="collection-box-look">
                        <Link className="react-view" to="/">
                            去逛逛
                        </Link>
                    </div>


                </div>
            </div>
        )
    }
}
