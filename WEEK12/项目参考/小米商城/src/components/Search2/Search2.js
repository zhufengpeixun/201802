import React, {Component} from 'react';
import './search2.less';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../../store/actions/search';

@connect(state => ({...state.search}), actions)
export default class Search2 extends Component {

    constructor() {
        super();
    }


    handleSearch = (e) => {
        let title = e.target.value;
        this.props.querySearch(title);
        let searchInfo = this.props.searchInfo;
        //   console.log(searchInfo);
        this.setState({
            searchInfo
        })
    }
    handleClick = (id) => {
        this.props.history.push(`/commodity/detail/${id}`);
    }

    componentWillUpdate() {

    }

    render() {
        let list = this.props.searchInfo;
        return <div className="search2">
            <div className="search">
                <div className="search-inner">
                    <Link className="a1" to="/home">
                        <i className="iconfont icon-fanhui"></i>
                    </Link>
                    <div className="search-input">
                        <input type="text" autoComplete="off" placeholder="搜索商品名称" autoCapitalize="off"
                               ref={x => this.info = x}
                               onChange={this.handleSearch}/>
                    </div>
                    <a href="javascript:;" className="a2">
                        <i className="iconfont icon-fangdajing"></i>
                    </a>
                </div>

                <div className="search-body">
                    <div className="search-sales">
                        <div className="search-title"> 热门搜索</div>
                        <div className="search-img">
                            <img
                                src="http://i8.mifile.cn/b2c-mimall-media/0662d0e830b52120319749b54741f708.jpg?bg=FFFFFF"
                                alt=""/>
                        </div>
                    </div>
                    <ul className="search-info">
                        {list.map((item, index) => (
                            <li key={index} onClick={this.handleClick.bind(this, item.id)}>
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    }
}