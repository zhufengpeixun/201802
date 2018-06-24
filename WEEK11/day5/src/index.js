import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Vote from './component/Vote/Vote';
import store from './store';

//=>RENDER
ReactDOM.render(<main>
    <Vote title={'英格兰对战巴拿马，哈里凯恩必胜！'}
          store={store}/>
</main>, root);