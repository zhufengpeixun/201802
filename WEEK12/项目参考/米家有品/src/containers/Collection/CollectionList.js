import React, {Component} from "react";
import "./index.less";

export default class CollectionList extends Component {
    render() {
        return (
            <div className="collection-box-view" style={{
                flexDirection: "column",
                alignItemstems: "center",
                width: "100%",
                textAlign: "center"
            }}><img src="https://static.home.mi.com/youpin/static/m/res/images/std_shop_details_icon_wrong.png" style={{
                width: ".83rem",
                height: ".83rem",
            }}/><span style={{
                display: "block",
                fontSize: ".14rem",
                margin: "20px 0px 17px",
                color: "rgb(153, 153, 153)",
                lineHeight: " 16.8px",
            }}>亲您还没有收藏的商品哦！
            </span>
            </div>

        )
    }
}
