import React, {Component} from 'react';
import './categoryList.less';
import {Link} from 'react-router-dom';

export default class CategoryList extends Component {
    render() {
        return (
            <div className="category-group">
                <a href="#" className="img-header">
                    <img src="" alt=""/>
                </a>
                <div className="group-title">
                    <span>{this.props.title}</span>
                </div>
                {this.props.list.map((item, index) => {
                    let pathname = (item.listId) ? `/commodity/list/${item.listId}` : `/commodity/detail/${item.id}`;

                    return (
                        <Link to={{pathname}}
                              key={index}
                              className="group-item">
                            <div className="img-box">
                                <img src={item.imgUrl} alt=""/>
                            </div>
                            <div className="item-name">{item.title}</div>
                        </Link>
                    )
                })}
                <a href="#" className="img-footer">
                    <img src="" alt=""/>
                </a>
            </div>
        )
    }
}