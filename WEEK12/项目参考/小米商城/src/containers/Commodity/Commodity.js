import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import List from "./List/List";
import Detail from "../Detail/Detail";

export default class Commodity extends Component {
    render() {
        return (
            <Switch>
                <Route path="/commodity/list/:listId" component={List}/>
                <Route path="/commodity/detail/:id" component={Detail}/>
            </Switch>
        )
    }
}