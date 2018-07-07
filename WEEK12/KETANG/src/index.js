/*
/!*BASE*!/
import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';

/!*REDUX STORE*!/
import {Provider} from 'react-redux';
import store from './store/index';

/!*ANTD*!/
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

/!*IMPORT CSS*!/
import './static/css/reset.min.css';
import './static/css/common.less';

/!*IMPORT COMPONENT*!/
import NavTop from './component/NavTop';
import NavBottom from './component/NavBottom';
import Home from './routes/Home';
import Mycourse from './routes/Mycourse';
import Person from './routes/Person';

/!*RENDER*!/
render(<Provider store={store}>
    <HashRouter>
        <LocaleProvider locale={zh_CN}>
            <div>
                {/!*HEADER*!/}
                <NavTop/>

                {/!*MAIN=>ROUTE*!/}
                <main className='container'>
                    <Switch>
                        <Route path='/course' component={Home}/>
                        <Route path='/mycourse' component={Mycourse}/>
                        <Route path='/person' component={Person}/>
                        <Redirect to='/course'/>
                    </Switch>
                </main>

                {/!*FOOTER*!/}
                <NavBottom/>
            </div>
        </LocaleProvider>
    </HashRouter>
</Provider>, root);*/

import axios from 'axios';

axios.get('/message/allCount').then(result => {
    console.log(result);
});