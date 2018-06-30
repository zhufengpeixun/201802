import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

/*IMPORT COMPONENT*/
import Login from './person/Login';
import Register from './person/Register';
import Info from './person/Info';
import Tip from './person/Tip';

/*IMPORT API*/
import {checkLogin} from '../api/person';
import '../static/css/person.less';

/*RENDER*/
class Person extends React.Component {
    constructor(props, context) {
        super(props, context);

        //=>STATE
        this.state = {
            isLogin: false
        };
    }

    //=>验证是否登录
    async componentWillMount() {
        let result = await checkLogin(),
            isLogin = parseFloat(result.code) === 0 ? true : false;
        this.setState({isLogin});
    }

    /*
     * 我们之前聊过，当路由切换的时候，对应的组件会重新的渲染，但是渲染也要分情况
     *   1. 之前渲染其它组件的时候把当前组件彻底从页面中移除了，再次渲染当前组件，走的是第一次挂载的流程（也就是一切从头开始）
     *
     *   2. 如果当前组件之前没有彻底在页面中移除（本组件内容的子组件在切换）,每一次走的是更新的流程，不是重新挂载的流程
     */

    async componentWillReceiveProps() {
        let result = await checkLogin(),
            isLogin = parseFloat(result.code) === 0 ? true : false;
        this.setState({isLogin});
    }

    render() {
        return <section>
            <Switch>
                {/*
                //=>路由的验证和渲染是同步的，不允许在校验中出现异步，因为这样在异步没有完成之前，根本不知道渲染谁，语法不支持这样的操作
                <Route path='/person/info' render={async () => {
                    //=>是否登录的权限校验
                    let result = await checkLogin();
                    if (parseFloat(result.code) === 0) {
                        return <Info/>;
                    }
                    return <Tip/>;
                }}/>
                */}
                <Route path='/person/info' render={() => {
                    //=>基于RENDER返回的组件不是受路由管控的组件
                    if (this.state.isLogin) {
                        return <Info/>;
                    }
                    return <Tip/>;
                }}/>
                <Route path='/person/login' component={Login}/>
                <Route path='/person/register' component={Register}/>
                <Redirect from='/person' to='/person/info'/>
            </Switch>
        </section>;
    }
}

export default connect()(Person);