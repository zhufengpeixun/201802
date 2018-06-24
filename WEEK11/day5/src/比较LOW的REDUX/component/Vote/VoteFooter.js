import React from 'react';
import PropTypes from "prop-types";

export default class VoteFooter extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div className={'panel-footer'}>
            <button className={'btn btn-success'} onClick={() => {
                this.props.myRedux.updateState(state => {
                    let {n = 0} = state;
                    return {
                        n: n + 1
                    };
                });
            }}>支持
            </button>
            &nbsp;&nbsp;
            <button className={'btn btn-danger'} onClick={() => {
                this.props.myRedux.updateState(state => {
                    let {m = 0} = state;
                    return {
                        m: m + 1
                    };
                });
            }}>反对
            </button>
        </div>;
    }
}