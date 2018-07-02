import React from 'react';
import {connect} from 'react-redux';
import actions from "../../store/actions/search";
import {withRouter} from 'react-router-dom';

class SearchInput extends React.Component {
    constructor() {
        super();
        this.state = {val: ''};
    }

    componentDidMount() {
        this.props.getInputVal(this.state.val);
    }

    inputFocus = () => {
        this.refs.searchInput.focus();
    };
    changeVal = () => {
        this.setState({
            val: this.refs.searchInput.value
        });
        if (this.refs.searchInput.value) {
            this.props.getSearchResultAPI(this.refs.searchInput.value);
        }
        this.props.getInputValueAPI(this.refs.searchInput.value);
        this.props.getInputVal(this.refs.searchInput.value);
    };
    goBack = () => {
        this.props.history.go(-1);
    };
    searchDetail = () => {
        if (this.refs.searchInput.value) {
            this.props.getSearchResultAPI(this.refs.searchInput.value);
        } else {
            this.props.history.push(`/detail/${this.props.detailVal.gid}`)
        }
    };

    render() {
        return (
            <div className='search_com'>
                <img
                    src="https://static.home.mi.com/youpin/static/m/res/images/std_tittlebar_main_device_back_normal.png"
                    className='icon_back' onClick={this.goBack}/>
                <div className='search_box'>
                    <img src="https://static.home.mi.com/youpin/static/m/res/images/home_search.png" alt=""/>
                    {!this.state.val ? <label onClick={this.inputFocus}>{this.props.detailVal.title}</label> : null}
                    <input type="text" className='search_input' value={this.state.val} ref='searchInput'
                           onChange={this.changeVal}
                           autoFocus/>
                </div>
                <span className='search_btn' onClick={this.searchDetail}>搜索</span>
            </div>
        )
    }
}

export default withRouter(connect(state => ({...state}), actions)(SearchInput))