import React from 'react';
import {connect} from 'react-redux';
import {Link, NavLink, withRouter} from 'react-router-dom';

/*
 *  Link：是REACT-ROUTER中提供的路由切换组件，基于它可以实现点击时候路由的切换
 *    TO [STRING]：跳转到指定的路由地址
 *    TO [OBJECT]：可以提供一些参数配置项（和REDIRECT类似）
 *      {
 *        PATHNAME：跳转地址
 *        SERACH：问号传参
 *        STATE：基于这种方式传递信息
 *      }
 *    REPLACE:FALSE  是替换HISTORY STACK中当前的地址（TRUE），还是追加一个新的地址（FALSE）
 *
 *  原理：基于LINK组件渲染，渲染后的结果就是一个A标签，TO对应的信息最后变为HREF中的内容
 *    <a class="navbar-brand" href="#/?lx=logo">珠峰培训CRM</a>
 *
 *  ------
 *
 *  REACT-ROUTER中提供的组件都要在任何一个ROUTER（HASH-ROUTER）包裹的范围内使用
 *
 *  ------
 *
 *  NAV-LINK：和LINK类似，都是为了实现路由切换跳转的，不同在于，NAV-LINK组件在当前页面HASH和组件对应地址相吻合的时候，会默认给组件加一个ACTIVE样式，让其有选中态
 *    和LINK类似，TO和REPLACE等属性都有，用法一样
 *
 *    activeClassName：把默认加的active样式类改为自己设定的
 *    activeStyle：给匹配的这个NAV-LINK设置行内样式
 *    exact & strict控制匹配的时候是否是严格匹配
 *    isActive：匹配后执行对应的函数
 *
 *    <NavLink to='/custom'>最后也会转换为A标签，如果当前页面的HASH地址和此组件中的TO地址匹配了，则会给渲染后的A标签设置默认的样式类：active
 */

class Nav extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <nav className='navbar navbar-default'>
            {/*LOGO*/}
            <div className='container-fluid col-md-2'>
                <Link className='navbar-brand' to={{
                    pathname: '/',
                    search: '?lx=logo'
                }}>珠峰培训CRM</Link>
            </div>

            {/*NAV*/}
            <div className='collapse navbar-collapse col-md-10'>
                <ul className='nav navbar-nav'>
                    {/*NAV-LINK不是点击谁，谁有选中的样式（但是可以路由切换），而且当前页面哈希后的地址和NAV-LINK中的TO进行比较，哪个匹配了，哪个才有选中的样式*/}
                    <li><NavLink to='/' exact>首页</NavLink></li>
                    <li><NavLink to='/custom'>客户管理</NavLink></li>
                    <li><NavLink to='/plan'>计划管理</NavLink></li>
                </ul>
            </div>
        </nav>;
    }
}

export default withRouter(connect()(Nav));