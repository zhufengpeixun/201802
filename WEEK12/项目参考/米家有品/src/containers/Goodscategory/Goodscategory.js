import React from 'react';
import './Goodscategory.less'
import icon_search from '../../images/home_search.png'
import {connect} from 'react-redux';
import actions from '../../store/actions/goodscategory'
import Banner from "./Banner";
import Items from "./Items";
import {withRouter} from "react-router-dom"

class Goodscategory extends React.Component {

    componentDidMount() {
        //如果没数据开始请求
        if (this.props.listLink.length === 0) {
            this.props.getGoodsDataAPI();
        }
    }

    handleNavClick(id) {
        this.props.setLinkListCurrentID(id);
        this.props.getLevelDataAPI(id);
    }

    render() {
        let {listLink, banner, data} = this.props;
        return (
            <div className="container">
                <div className="g-header">
                    <div className="search" onClick={() => {
                        this.props.history.push('/search')
                    }}>
                        <img src={icon_search}/>
                        <span>年货嗨抢，最高直降1000</span>
                    </div>
                </div>
                <div className="g-body">
                    <div className="nav">
                        <ul>
                            {listLink.map((item, index) => (
                                <li key={index} className={this.props.listCurrentID === item.id ? "current" : ""}
                                    onClick={() => {
                                        this.handleNavClick(item.id)
                                    }}>{item.linkName}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="content">
                        <Banner banner={banner} id={this.props.listCurrentID}/>
                        <Items id={this.props.listCurrentID} data={data}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(state => ({...state.goodscategory}), actions)(Goodscategory));