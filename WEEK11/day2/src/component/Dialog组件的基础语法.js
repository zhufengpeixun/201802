import React from 'react';//=>每一个组件中都要导入REACT，因为需要基于它的CREATE-ELEMENT把JSX进行解析渲染呢

/*
 * 函数式声明组件
 *   1.函数返回结果是一个新的JSX（也就是当前组件的JSX结构）
 *
 *   2.PROPS变量存储的值是一个对象，包含了调取组件时候传递的属性值（不传递是一个空对象）
 */
export default function Dialog(props) {
    let {con, lx = 0, children, style = {}} = props,
        title = lx === 0 ? '系统提示' : '系统警告';

    //=>children：可能有可能没有，可能只是一个值，也可能是一个数组，可能每一项是一个字符串，也可能是一个对象等 (代表双闭合组件中的子元素)
    return <section style={style}>
        <h2>{title}</h2>
        <div>{con}</div>
        {/*把属性中传递的子元素放到组件中的指定位置*/}
        {/*{children}*/}

        {/*也可以基于REACT中提供的专门遍历CHILDREN的方法来完成遍历操作*/}
        {
            React.Children.map(children, item => item)
        }
    </section>;
};