import React from 'react';

export default class Banner extends React.Component {
    render() {
        return (
            <div className="banner">
                <img src={this.props.banner[this.props.id].url} alt=""/>
                {/*<img src={this.props.data[0].url} alt=""/>*/}
            </div>
        )
    }
}