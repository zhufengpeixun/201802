import React from 'react';//=>每一个组件中都要导入REACT，因为需要基于它的CREATE-ELEMENT把JSX进行解析渲染呢

/*
 * 函数式声明组件
 *   1.函数返回结果是一个新的JSX（也就是当前组件的JSX结构）
 *
 *   2.PROPS变量存储的值是一个对象，包含了调取组件时候传递的属性值（不传递是一个空对象）
 */
export default function Dialog(props) {
    let {con, lx = 0} = props,
        title = lx === 0 ? '系统提示' : '系统警告';

    return <section>
        <h2>{title}</h2>
        <div>{con}</div>
    </section>;
};