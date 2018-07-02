import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import actions from "../../store/actions/search";

class SearchList extends React.Component {
    render() {
        return (
            <div className='search_list'>
                <ul className='search_list_wrap'>
                    {
                        this.props.search.searchResult.map((item, index) => {
                            return (
                                <li key={index} onClick={() => {
                                    this.props.putHistory(item.gid)
                                }}>
                                    <Link to={{pathname: `/detail/${item.gid}`}}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(state => ({...state}), actions)(SearchList);