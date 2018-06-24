import React from 'react';
import PropTypes from 'prop-types';

import VoteHead from "./VoteHead";
import VoteBody from "./VoteBody";
import VoteFooter from "./VoteFooter";

export default class Vote extends React.Component {
    //=>PROPS
    static defaultProps = {
        title: '标题不知道，随便投吧',
        count: {
            n: 0,
            m: 0
        }
    };

    //=>CONTEXT
    static childContextTypes = {
        n: PropTypes.number,
        m: PropTypes.number,
        callBack: PropTypes.func
    };

    getChildContext() {
        //=>只要RENDER重新渲染，就会执行这个方法，重新更新父组件中的上下文信息；如果父组件上下文信息更改了，子组件在重新调取的时候，会使用最新的上下文信息；（RENDER=>CONTEXT=>子组件调取渲染）
        let {n, m} = this.state;
        return {
            n,
            m,
            callBack: this.updateContext
        };
    }

    updateContext = type => {
        //=>TYPE:'SUPPORT'/'AGAINST'
        if (type === 'support') {
            this.setState({n: this.state.n + 1});
            return;
        }
        this.setState({m: this.state.m + 1});
    };

    constructor(props) {
        super(props);

        //=>INIT STATE
        let {count: {n = 0, m = 0}} = this.props;
        this.state = {n, m};
    }

    render() {
        let {title} = this.props;

        return <section className={'panel panel-default'} style={{width: '50%', margin: '20px auto'}}>
            <VoteHead title={title}/>
            <VoteBody/>
            <VoteFooter/>
        </section>;
    }
}