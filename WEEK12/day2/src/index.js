import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

/*IMPORT CSS*/
import 'bootstrap/dist/css/bootstrap.css';
import './static/less/todo.less';

/*IMPORT COMPONENT*/
import Head from "./component/Head";
import Body from "./component/Body";
import Footer from "./component/Footer";

render(<Provider store={store}>
    <main className='panel panel-default'>
        <Head/>
        <Body/>
        <Footer/>
    </main>
</Provider>, root);