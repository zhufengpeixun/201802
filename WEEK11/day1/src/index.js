import React from 'react';
import ReactDOM, {render} from 'react-dom';//=>从REACT-DOM中导入一个ReactDOM，逗号后面的内容是把ReactDOM这个对象进行解构  <=> import {render} from 'react-dom';
import './3-SELF-JSX';

/*
 * JSX渲染机制
 *   1.基于BABEL中的语法解析模块（BABEL-PRESET-REACT）把JSX语法编译为 React.createElement(...) 结构
 *     React.createElement(
           'h1',
           {id: 'titleBox',className: 'title',style: styleObj},
           '\u73E0\u5CF0\u57F9\u8BAD' ->珠峰培训
       );
 *
 *   2.执行React.createElement(type, props, children)，创建一个对象（虚拟DOM）
 *     type:'h1'
 *     props:{
 *        id:'titleBox',
 *        className:'title',
 *        style:...,
 *        children:'珠峰培训'   =>存放的是元素中的内容
 *     }
 *     ref:null
 *     key:null
 *     ...
 *     __proto__:Object.prototype
 *
 *  3.ReactDOM.render(JSX语法最后生成的对象,容器)，基于RENDER方法把生成的对象动态创建为DOM圆度，插入到指定的容器中
 */

render(<div id='box' className='box'>
    <h1 className='title'>珠峰培训</h1>
    <ul className='newsList'>
        <li>数据1</li>
        <li>数据2</li>
        <li>数据3</li>
    </ul>
    我就是测试着玩
</div>, root);

/*console.log(React.createElement(
    'h1',
    {id: 'titleBox', className: 'title', style: styleObj, ref: 'AA', key: '12'},
    '\u73E0\u5CF0\u57F9\u8BAD'
));*/

console.log(React.createElement(
    'div',
    {id: 'box', className: 'box'},
    React.createElement(
        'h1',
        {className: 'title'},
        '\u73E0\u5CF0\u57F9\u8BAD'
    ),
    React.createElement(
        'ul',
        {className: 'newsList'},
        React.createElement(
            'li',
            null,
            '\u6570\u636E1'
        ),
        React.createElement(
            'li',
            null,
            '\u6570\u636E2'
        ),
        React.createElement(
            'li',
            null,
            '\u6570\u636E3'
        )
    ),
    '\u6211\u5C31\u662F\u6D4B\u8BD5\u7740\u73A9'
));







