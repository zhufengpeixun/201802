import React from 'react';
import PropTypes from 'prop-types';
import VoteHead from "./VoteHead";
import VoteBody from "./VoteBody";
import VoteFooter from "./VoteFooter";

export default class Vote extends React.Component {
    //=>PROPS
    static defaultProps = {
        title: '',
        count: {
            n: 0,
            m: 0
        }
    };

    constructor(props) {
        super(props);
    }

    render() {
        let {store} = this.props;

        return <section className={'panel panel-default'} style={{width: '50%', margin: '20px auto'}}>
            <VoteHead title={this.props.title}/>

            <VoteBody store={store}/>
            <VoteFooter store={store}/>
        </section>;
    }
}