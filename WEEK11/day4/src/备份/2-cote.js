import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import Vote from './component/Vote';

/*
 * 真实项目中使用REACT都是基于组件或者模块开发的
 *   1. 函数式创建组件
 *   2. 基于类创建组件
 *
 * 调取组件的时候：BABEL解析，传递给CREATE-ELEMENT的第一个参数TYPE不在是字符串标签名，而是一个函数（类），生成的对象中，TYPE也是一个函数；当RENDER渲染的时候会根据TYPE类型做不同的事情（如果是字符串就是创建新元素，如果是函数，就会把函数执行，把返回的JSX对象创建成为新的元素进行渲染），函数执行的时候会把解析出来的对象中的PROPS做为参数传递给组件（函数）
 *
 * 函数式组件声明的特点：
 *   1. 会把基于CREATE-ELEMENT解析出来的对象中的PROPS做为参数传递给组件（可以完成：多次调取组件传递不同的信息）
 *   2. 一旦组件调取成功，返回的JSX就会渲染到页面上，但是后期不通过重新调取组件或者获取DOM元素操作操作的方式，很难再把渲染好组件中的内容更改 =>函数是组件声明是“静态组件”
 */
ReactDOM.render(<div>
    <Vote title={'德国对阵墨西哥，德国战车必胜！'}/>

    <Vote title={'夏侯楙和曹冲两人谁帅？都很丑！'}>
        {/*双闭合调取组件，就是为了传递子元素的*/}
        <p>投票说明：上善若水。水善利万物而不争，处众人之所恶，故几于道。居，善地；心，善渊；与，善仁；言，善信；政，善治；事，善能；动，善时。夫唯不争，故无尤。</p>
    </Vote>
</div>, root);