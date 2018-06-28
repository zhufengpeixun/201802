import React from 'react';
import {connect} from 'react-redux';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import Custom from "./Custom";
import Plan from "./Plan";
import Home from "./Home";

/*
 * 部分项目中会把路由管控全部放到APP中处理，认为APP是项目页面的主入口
 */

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <HashRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/custom' component={Custom}/>
                <Route path='/plan' component={Plan}/>
                <Redirect to='/?lx=unsafe'/>
            </Switch>
        </HashRouter>;
    }
}

export default connect()(App);