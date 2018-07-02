import React, {Component} from 'react';
import './list.less';
import ListItem from "./ListItem/ListItem";
import Nav from "../../../components/Nav/Nav";
import {getList} from '../../../api/list';

export default class List extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
        }
    }

    async componentDidMount() {
        let {listId} = this.props.match.params;
        //    console.log(listId);
        let list = await getList(listId);
        //   console.log(list);
        this.setState({list});
    }

    render() {
        return (
            <div>
                <Nav>商品列表</Nav>
                <div className="content_m">
                    {this.state.list.map((item, index) => (
                        <ListItem product={item} key={index}/>
                    ))}
                </div>
            </div>
        )
    }
}