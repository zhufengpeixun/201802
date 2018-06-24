import React from 'react';

export default class VoteHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={'panel-heading'}>
            <h3 className={'panel-title'}>
                {this.props.title}
            </h3>
        </div>;
    }
}