import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Vote from './component/Vote/Vote';

ReactDOM.render(<main>
    {/*TITLE：标题  COUNT：初始支持反对人数*/}
    <Vote title={'英格兰对战巴拿马，哈里凯恩必胜！'}
          count={{
              n: 100,
              m: 78
          }}/>
</main>, root);