import React from 'react';
import ReactDOM, {render} from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import VoteBase from "./component/vote/VoteBase";
import VoteHandle from "./component/vote/VoteHandle";
import store from './store';

render(<section className='panel panel-default' style={{width: '50%', margin: '20px auto'}}>
    <VoteBase store={store}/>
    <VoteHandle store={store}/>
</section>, root);