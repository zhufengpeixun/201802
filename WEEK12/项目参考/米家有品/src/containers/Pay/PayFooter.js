import React from 'react';
import {withRouter} from 'react-router-dom'

class PayFooter extends React.Component {
    render() {
        return (
            <div className="bottom">
                <div className="address">
                    <p>配送至：北京 北京市 昌平区 回龙观地区</p>
                </div>
                <div className="footer">
                    <div className="total">
                        <span>合计:</span>
                        <span>￥{this.props.total}</span>
                    </div>
                    <div className="paybtn" onClick={() => {
                        this.props.history.push('/pay/password')
                    }}>
                        <span>去支付</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(PayFooter)