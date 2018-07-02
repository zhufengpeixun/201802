import React, {Component} from 'react'

export default class savourLoading extends Component {
    render() {
        return (
            <div className="loading"
                 style={{position: 'absolute', top: '500px', zIndex: 100, color: 'red'}}>加载中...</div>
        )
    }
}