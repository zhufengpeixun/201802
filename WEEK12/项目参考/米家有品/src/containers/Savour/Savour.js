import React from 'react';
import actions from '../../store/actions/savour/savour'
import {connect} from 'react-redux'
import './Savour.less'
import {ajax} from '../Savour/util'
import Header from '../../components/Header/Header'
import SavourText from "./SavourText";
import SavourLoading from './SavourLoading'

class Savour extends React.Component {
    constructor() {
        super();
    }

    getData = () => {
        let offset = this.props.mySavour.list.length;
        let limit = 5;
        let old = this.props.mySavour.list;
        ajax({
            url: 'http://localhost:9999/savour',
            method: 'POST',
            data: {
                offset,
                limit
            }
        }).then((val) => {
            let {hasMore, savour} = val;
            this.props.getSavour(old, savour);
        });
        this.loadMore();
    };

    componentDidMount() {
        this.getData();
    }

    loadMore = () => {
        let eleSavour = this.refs.mainSavour;
        eleSavour.addEventListener('scroll', (e) => {
            clearTimeout(this.$timer);
            this.$timer = setTimeout(() => {
                let {scrollTop, scrollHeight, offsetHeight} = e.target;
                let {hasMore, isLoad} = this.props.mySavour;
                if (scrollTop + offsetHeight + 50 >= scrollHeight) {
                    if (!hasMore || isLoad) {
                        this.getData()
                    }
                }
            }, 30)
        }, false)
    };

    render() {
        return (
            <div className="savour_main" ref="mainSavour">
                <Header back={false}>品味</Header>
                <SavourText lists={this.props.mySavour.list}/>
            </div>
        )
    }
}

export default connect(state => ({...state}), {...actions})(Savour);

