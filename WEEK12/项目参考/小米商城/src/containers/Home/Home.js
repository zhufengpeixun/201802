import React, {Component} from 'react';
import Header from "./Header/Header";
import {Route, Switch, Redirect} from 'react-router-dom';
import Refer from "./Refer/Refer";
import Smart from "./Smart/Smart";
import TV from "./TV/TV";
import Phone from "./Phone/Phone";
import Living from "./Living/Living";
import Computer from "./Computer/Computer";

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home/refer" component={Refer}/>
                    <Route path="/home/smart" component={Smart}/>
                    <Route path="/home/tv" component={TV}/>
                    <Route path="/home/phone" component={Phone}/>
                    <Route path="/home/living" component={Living}/>
                    <Route path="/home/computer" component={Computer}/>
                    <Redirect to="/home/smart"/>
                </Switch>
            </div>
        )
    }
}