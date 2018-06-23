import React from 'react';
import ReactDOM from 'react-dom';

/*
 * JSX语法：JSX元素\REACT元素\虚拟DOM
 *
 * REACT是如何把JSX元素转换为真实的DOM元素并且添加到页面中？
 *   1. 基于BABEL/BABEL-LOADER/BABEL-PRESET-REACT-APP：把JSX语法编译为REACT.CREATE-ELEMENT这种模式
 *    =>CREATE-ELEMENT中至少两个参数，没有上限
 *     第一个：目前是当前元素标签的标签名（字符串）
 *     第二个：属性（没有给元素设置属性则为NULL）
 *     其它的：当前元素的所有子元素内容（只要子元素是HTML，就会变为新的CREATE-ELEMENT）
 *
 *   2. 执行CREATE-ELEMENT，把传递进来的参数最后处理成为一个对象
 *    {
 *      type:'标签名',
 *      props:{
 *         自己设置的那些属性对象（但是对于KEY和REF来说是要提取出来的）,
 *         children：存放自己子元素的（没有子元素就没有这个属性），如果有多个子元素，就以数组的形式存储信息
 *      },
 *      ref:null,
 *      key:null
 *    }
 *
 *   3. 把生成的对象交给RENDER进行处理：把对象编程DOM元素，插入到指定的容器中
 */

let createElement = (type, props, ...childs) => {
    props = props || {};
    //=>REF && KEY
    let ref = null,
        key = null;
    'ref' in props ? (ref = props['ref'], props['ref'] = undefined) : null;
    'key' in props ? (key = props['key'], props['key'] = undefined) : null;
    return {
        type, //=>type:type
        props: {
            ...props,
            //=>保证CHILDREN是一项或者是数组多项
            children: childs.length <= 1 ? (childs[0] || '') : childs
        },
        ref,
        key
    };
};

let objJSX = createElement(
    'section',
    {
        id: 'box', className: 'box', style: {color: 'red'}, onClick: function onClick(ev) {
            console.log(ev);
        }
    },
    '\u73E0\u5CF0\u57F9\u8BAD\uFF01',
    createElement(
        'h2',
        null,
        '\u8BFE\u7A0B\u4F53\u7CFB'
    ),
    createElement('p', {className: 'content'})
);


//=>RENDER
let render = (objJSX, container, callBack) => {
    let {type, props} = objJSX,
        {children} = props,
        newElement = document.createElement(type);
    for (let attr in props) {
        if (!props.hasOwnProperty(attr)) break;
        let valueJSX = props[attr];
        typeof valueJSX === 'undefined' ? valueJSX = '' : null;

        //=>事件属性处理
        let regEvent = /^on/;
        if (regEvent.test(attr)) {
            newElement.addEventListener(attr.toLowerCase().substr(2), valueJSX.bind(undefined), false);
            continue;
        }

        //=>特殊属性处理
        switch (attr.toUpperCase()) {
            case 'CLASSNAME':
                newElement.setAttribute('class', valueJSX);
                break;
            case 'STYLE':
                for (let styATTR in valueJSX) {
                    if (valueJSX.hasOwnProperty(styATTR)) {
                        newElement.style[styATTR] = valueJSX[styATTR];
                    }
                }
                break;
            case 'CHILDREN':
                !(valueJSX instanceof Array) ? valueJSX = [valueJSX] : null;
                valueJSX.forEach(item => {
                    if (typeof item === 'string') {
                        newElement.appendChild(document.createTextNode(item));
                        return;
                    }
                    render(item, newElement);//=>递归调用
                });
                break;
            default:
                newElement.setAttribute(attr, valueJSX);
        }
    }
    container.appendChild(newElement);
    callBack && callBack();
};
render(objJSX, root);


// ReactDOM.render(<section id={'box'} className={'box'} style={{color: 'red'}} onClick={ev => {
//     console.log(ev);
// }}>
//     珠峰培训！
//     <h2 className={'title'}>课程体系</h2>
//     <p className={'content'}>
//         最强大的课程体系，打造“大前端”、“全栈前端”、“工程化前端”等
//     </p>
// </section>, root);
