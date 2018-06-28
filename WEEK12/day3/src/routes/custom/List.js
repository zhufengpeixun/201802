import React from 'react';
import {connect} from 'react-redux';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {data} = this.props;
        return <ul className='list-group'>
            {data.map((item, index) => {
                let {id, name} = item;
                return <li className='list-group-item' key={index}>
                    编号：{id}
                    &nbsp;&nbsp;
                    姓名：{name}
                </li>;
            })}
        </ul>;
    }
}

export default connect(state => ({...state.custom}))(List);