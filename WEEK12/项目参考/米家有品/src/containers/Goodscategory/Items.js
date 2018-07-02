import React from 'react';
import {Link} from 'react-router-dom'

export default class Items extends React.Component {
    render() {
        return (
            <div className="items">
                {this.props.data.map((item, index) => {
                    let {url, gid, title} = item;

                    if (this.props.id === "G0004") { //手机
                        return <div className="item" key={index}>
                            <Link to={{pathname: `/detail/${gid}`, state: gid}}>
                                <img src={url} alt=""/>
                                <span>{title}</span>
                            </Link>
                        </div>
                    } else {
                        return <div className="item" key={index}>
                            <img src={url} alt=""/>
                            <span>{title}</span>
                        </div>
                    }
                })}
                <div className="item"></div>
                <div className="item"></div>
            </div>
        )
    }
}