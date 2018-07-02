import React from 'react';
import './loading.less'

export default class Loading extends React.Component {
    render() {
        return <div className="loading">
            <div className='loader loader--glisteningWindow'></div>
        </div>
    }
}
