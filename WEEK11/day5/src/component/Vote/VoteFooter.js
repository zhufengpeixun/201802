import React from 'react';
import PropTypes from "prop-types";

export default class VoteFooter extends React.Component {
    static contextTypes = {
        callBack: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {callBack} = this.context;

        return <div className={'panel-footer'}>
            <button className={'btn btn-success'} onClick={() => {
                callBack('support');
            }}>支持
            </button>
            &nbsp;&nbsp;
            <button className={'btn btn-danger'} onClick={() => {
                callBack('against');
            }}>反对
            </button>
        </div>;
    }
}