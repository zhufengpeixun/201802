import React from 'react';
import ReactDOM from 'react-dom';

/*
 * ReactDOM.render([JSX],[CONTAINER],[CALLBACK])：把JSX元素渲染到页面中
 *   JSX：REACT虚拟元素
 *   CONTAINER：容器，我们想把元素放到页面中的哪个容器中
 *   CALLBACK：当把内容放到页面中呈现触发的回调函数
 *
 * JSX：REACT独有的语法  JAVASCRIPT+XML(HTML)
 *   和我们之前自己拼接的HTML字符串类似,都是把HTML结构代码和JS代码或者数据混合在一起了,但是它不是字符串
 *
 *   1.不建议我们把JSX直接渲染到BODY中，而是放在自己创建一个容器中，一般我们都放在一个ID为ROOT的DIV中即可
 *
 *   2.在JSX中出现的{}是存放JS的，但是要求JS代码指执行完成有返回结果（JS表达式）
 *     ->不能直接放一个对象数据类型的值(对象（除了给style赋值）、数组（数组中如有没有对象，都是基本值或者是JSX元素，这样是可以的）、函数都不行)
 *     ->可以是基本类型的值（布尔类型什么都不显示、null、undefined也是JSX元素，代表的是空）
 *     ->循环判断的语句都不支持，但是支持三元运算符
 *
 *   3.循环数组创建JSX元素（一般都基于数组的MAP方法完成迭代），需要给创建的元素设置唯一的KEY值（当前本次循环内唯一即可）
 *
 *   4.只能出现一个根元素
 *
 *   5.给元素设置样式类用的是className而不是class
 *
 *   6.style中不能直接的写样式字符串，需要基于一个样式对象来遍历赋值
 */
/*let root = document.querySelector('#root');
ReactDOM.render(<div id='box' className="box" style={{color: 'red'}}>
    <h1>我是标题</h1>
    <ul>

    </ul>
</div>, root);*/

/*let data = [{
    name: '张三',
    age: 22
}, {
    name: '李四',
    age: 23
}];
ReactDOM.render(<div id="box">
    HELLO WORLD!
    <ul>
        {data.map((item, index) => {
            let {name, age} = item;
            return <li key={index}>
                <span>{name}</span>
                <span>{age}</span>
            </li>;
        })}
    </ul>
</div>, root);*/

/*
let data = '珠峰培训';
ReactDOM.render(<div id="box">HELLO WORLD! {data}</div>, root, () => {
    let oBox = document.querySelector('#box');
    console.log(oBox.innerHTML);
});
*/







