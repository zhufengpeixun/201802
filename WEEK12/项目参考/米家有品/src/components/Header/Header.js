import React from 'react';
import {withRouter} from 'react-router-dom'
import './Header.less'

class Header extends React.Component {
    goodBack = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <div className="header">
                {this.props.back ? <i className="header_icon" onClick={this.goodBack}>
                    <img
                        src="https://static.home.mi.com/youpin/static/m/res/images/std_tittlebar_main_device_back_normal.png"
                        alt=""/>
                </i> : ''}
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Header)

// 使用方法
// import Header from '../../components/Header/Header'
// <Header back={true}>XXX</Header>