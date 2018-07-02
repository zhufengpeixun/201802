import React from 'react';
import {Link} from 'react-router-dom';

export default class HotSearch extends React.Component {
    render() {
        return (
            <div className='hot_search'>
                <h3>热门搜索</h3>
                <ul className='hot_list'>
                    {
                        this.props.hotSearch.map((item, index) => {
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

