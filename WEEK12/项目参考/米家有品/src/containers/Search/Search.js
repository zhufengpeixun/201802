import React from 'react';
import './Search.less';
import SearchInput from "./SearchInput";
import HotSearch from "./HotSearch";
import HistorySearch from "./HistorySearch";
import SearchList from "./SearchList";
import {connect} from 'react-redux';
import actions from "../../store/actions/search";
import {putHistory} from "../../api/api";

class Search extends React.Component {
    async componentWillMount() {
        await this.props.getInitSearchAPI();
    }

    clearHistory = () => {
        this.props.clearHistorySearchAPI();
    };

    putHistory = (gid) => {
        putHistory(gid);
    };

    getInputVal = (val) => {
        this.searchVal = val;
    };

    render() {
        return (
            <div className='searchPage'>
                <SearchInput detailVal={this.props.search.detailSearch} getInputVal={this.getInputVal}/>
                {(this.searchVal && this.props.search.searchResult.length) ?
                    <SearchList putHistory={this.putHistory}/> : null}
                <div className='detailSearch'>
                    <HotSearch hotSearch={this.props.search.hot} putHistory={this.putHistory}/>
                    {
                        this.props.search.history.length ?
                            <HistorySearch historySearch={this.props.search.history}
                                           clearHistory={this.clearHistory}/> : null
                    }
                </div>
            </div>
        )
    }
}

export default connect(state => ({...state}), actions)(Search);