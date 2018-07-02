import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import store from './store';
import {Provider} from 'react-redux';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from "./containers/Home/Home";
import Category from "./containers/Category/Category";
import Cart from "./containers/Cart/Cart";
import User from "./containers/User/User";
import Login from "./containers/Login/Login";
import Reg from "./containers/Reg/Reg";
import Logout from "./containers/Logout/Logout";
import Detail from "./containers/Detail/Detail";
import MSearch from "./components/Search2/Search2";
import Commodity from "./containers/Commodity/Commodity";
import NotFound from "./components/NotFound/NotFound";

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <App>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/category" component={Category}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/user" component={User}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/reg" component={Reg}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/detail/:id" component={Detail}/>
                    <Route path="/search" component={MSearch}/>
                    <Route path="/commodity" component={Commodity}/>
                    <Route path="notfound" component={NotFound}/>
                    <Redirect to="/home"/>
                </Switch>
            </App>
        </Router>
    </Provider>
), document.getElementById('root'));

