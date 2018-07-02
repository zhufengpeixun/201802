import React, {Component} from "react";
import "./index.less";

export default class MainFooter extends Component {
    render() {
        return (
            <div className="cwj-main-footer">
                <div className="rompt-information">
                    <span>底线在此,不能更低了</span>
                </div>
                <div className="footer-copyright-box">
                    <span>Copyright © 小米通讯技术有限公司 版权所有</span>
                    <span>京ICP备17028681号-1 联系电话：010-60606666</span>
                </div>
            </div>
        )
    }
}
