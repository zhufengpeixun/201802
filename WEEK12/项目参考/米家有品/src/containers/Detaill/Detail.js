import React from 'react';
import {withRouter} from 'react-router-dom'
import './Detail.less'
import DetailHeader from "./DetailHeader";
import DetailEvaluate from "./DetailEvaluate";
import DetailRoute from "./DetailBottom";
import store from '../../store'

class Detail extends React.Component {
    constructor() {
        super();
    }

    handBack = () => {
        this.props.history.goBack();
    };
    handHome = () => {
        this.props.history.push('/');
    };

    //判断是否为登陆态
    isLogin = (err, user) => {
        if (err === 1 && user == null) {
            this.props.history.push('/login');
        }
    };
    loginTrue1 = (err, user) => {
        if (err !== 1 && user != null) {
            this.props.history.push('/cart')
        }
    };
    loginTrue2 = (err, user) => {
        if (err !== 1 && user != null) {
            this.props.history.push('/pay')
        }
    };

    render() {
        return (
            <div className="main">
                <DetailHeader handBack={this.handBack} handHome={this.handHome} index={this.props.match.params.id}/>
                <div className="detail_xiaomi clearfix">
                    <img
                        src="http://static.home.mi.com/app/shop/img?id=shop_72bacf474dfad998341d995c6fcb9db1.jpg&t=jpeg"
                        alt=""/>
                    <p>小米自营产品</p>
                    <span>为发烧而生</span>
                </div>

                <div className="detail_pingjia clearfix">
                <span>
                    用户评价(1777)
                    <b>97%满意 <img
                        src="https://static.home.mi.com/youpin/static/m/res/images/device_shop_right_arrow.png"
                        alt=""/></b>
                </span>
                </div>

                <DetailEvaluate index={this.props.match.params.id}/>

                <DetailRoute isLogin={this.isLogin} loginTrue1={this.loginTrue1} loginTrue2={this.loginTrue2}
                             store={store}
                             index={this.props.match.params.id}/>
            </div>
        )
    }
}

export default withRouter(Detail)
