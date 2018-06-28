import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Redirect, NavLink, Link} from 'react-router-dom';

/*IMPORT COMPONENT*/
import List from './custom/List';
import Create from './custom/Create';
import Detail from './custom/Detail';

class Custom extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <section>
            {/*左侧MENU导航*/}
            <ul className='nav nav-pills nav-stacked col-md-2'>
                <li className="presentation">
                    <NavLink to='/custom/list'>客户列表</NavLink>
                </li>
                <li className="presentation">
                    <NavLink to='/custom/create'>增加客户</NavLink>
                </li>
            </ul>

            {/*右侧展示对应的内容：也是基于路由管理（二级路由）*/}
            <div className='col-md-10'>
                <Switch>
                    {/*<Route path='/custom' exact component={List}/>*/}
                    <Route path='/custom/list' component={List}/>
                    <Route path='/custom/create' component={Create}/>
                    <Route path='/custom/detail/:id' component={Detail}/>

                    {/*进入到客户管理页面,我们让其默认展示就是LIST区域内容（第一种指定渲染组件的操作也可以），这种重定向的方式也可以*/}
                    <Redirect from='/custom' to='/custom/list'/>
                </Switch>
            </div>
        </section>;
    }
}

export default connect()(Custom);