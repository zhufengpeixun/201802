import React from 'react';
import {Link} from 'react-router-dom';

export default class Recommend extends React.Component {
    render() {
        return (
            <div className='recommend'>
                <div className='rec_title'>
                    <div className='view_hr'></div>
                    <div className='view_title'>为您推荐</div>
                    <div className='view_hr'></div>
                </div>

                <ul className='rec_list'>
                    {
                        this.props.recommend.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={{pathname: `/detail/${item.gid}`}}>
                                        <div className='rec_top'>
                                            <div className='rec_img'>
                                                <img src={item.url} alt=""/>
                                            </div>
                                            <p>{item.title}</p>
                                        </div>
                                        <div className='rec_footer'>
                                            <p>{item.describe}</p>
                                            <p>￥{item.price} {item.mark ?
                                                <span className='distribution'>有品配送</span> : null}</p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}