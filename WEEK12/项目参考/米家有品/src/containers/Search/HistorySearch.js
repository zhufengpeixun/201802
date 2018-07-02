import React from 'react';
import {Link} from 'react-router-dom';

export default class HistorySearch extends React.Component {
    render() {
        return (
            <div className='history_search'>
                <h3>历史搜索 <i className='clear_Btn' onClick={this.props.clearHistory}>清空</i></h3>
                <ul className='history_list'>
                    {
                        this.props.historySearch.map((item, index) => {
                            return (
                                <li key={index}>
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
