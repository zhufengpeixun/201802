import React from 'react';
import PropTypes from 'prop-types';

import VoteHead from "./VoteHead";
import VoteBody from "./VoteBody";
import VoteFooter from "./VoteFooter";

export default class Vote extends React.Component {
    static defaultProps = {
        title: '标题不知道，随便投吧',
        count: {
            n: 0,
            m: 0
        }
    };

    /*
     * 在父组件中
     *   需要安装:prop-types
     *
     *   1. 设置子组件上下文属性值类型
     *      static childContextTypes = {};
     *
     *   2. 获取子组件的上下文（设置子组件的上下文属性信息）
     *      getChildContext(){return {}}
     */
    static childContextTypes = {
        n: PropTypes.number,
        m: PropTypes.number
    };

    getChildContext() {
        //->RETURN的是啥，相当于给子组件上下文设置成为啥
        let {count: {n = 0, m = 0}} = this.props;
        return {
            n,
            m
        };
    }

    constructor(props) {
        super(props);
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