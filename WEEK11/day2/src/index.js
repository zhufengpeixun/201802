import React from 'react';
import ReactDOM from 'react-dom';

import {createElement, render} from './1-JSX';

let objJSX = createElement(
    'div',
    {id: 'box', className: 'box', style: {color: 'red'}},
    createElement(
        'h2',
        {className: 'title'},
        '\u7CFB\u7EDF\u63D0\u793A'
    ),
    createElement(
        'div',
        {className: 'content'},
        '\u6E29\u99A8\u63D0\u793A\uFF1A\u8BED\u6CD5\u9519\u8BEF\uFF01'
    ),
    '\u672C\u64CD\u4F5C\u5C31\u662F\u4E00\u4E2A\u6D4B\u8BD5\uFF01'
);
render(objJSX, root);


