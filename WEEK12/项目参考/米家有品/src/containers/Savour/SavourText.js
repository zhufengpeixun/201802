import React, {Component} from 'react'

export default class SavourText extends Component {
    render() {
        return (
            <div>
                <ul className="savour_container" style={{marginTop: '45px'}}>
                    {this.props.lists.map((item, index) => (
                        <li key={index}>
                            <a href="https://static.home.mi.com/app/shop/content?aid=t2de9503976d3a476&v=1517397820">
                                <img src={item.pic_url} alt=""/>
                                <span>{item.title}</span>
                                <b>有品生活每一天</b>
                                <p>去发现</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}