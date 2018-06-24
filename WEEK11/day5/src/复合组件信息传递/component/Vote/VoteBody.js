import React from 'react';
import PropTypes from 'prop-types';

export default class VoteBody extends React.Component {
    static contextTypes = {
        n: PropTypes.number,
        m: PropTypes.number
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {n, m} = this.context,
            rate = (n / (n + m)) * 100;
        isNaN(rate) ? rate = 0 : null;

        return <div className={'panel-body'}>
            支持人数：<span>{n}</span>
            <br/>
            反对人数：<span>{m}</span>
            <br/>
            支持比率：<span>{rate.toFixed(2) + '%'}</span>
        </div>;
    }
}