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

/*
 * WITH-ROUTER：这个方法意思是把一个非路由管控的组件，模拟成为路由管控的组件
 *   <ROUTE PATH='/' COMPONENT={NAV}/> 受路由管控的组件
 *
 *   WITH-ROUTER(CONNECT()(NAV)) 先把NAV基于CONNECT高阶一下，返回的是一个代理组件PROXY，把返回的代理组件受路由管控
 *
 * 受路由管控组件的一些特点：
 *   1. 只有当前页面的哈希地址（/#/...）和路由指定的地址（PATH）匹配，才会把对应的组件渲染（WITH-ROUTER是没有地址匹配，都被模拟成为受路由管控的）
 *
 *   2. 路由切换的原理，凡是匹配的路由，都会把对应的组件内容，重新添加到页面中，相反，不匹配的都会在页面中移除掉，下一次重新匹配上，组件需要重新渲染到页面中；每一次路由切换的时候（页面的哈希路由地址改变），都会从一级路由开始重新校验一遍；
 *
 *   3. 所有受路由管控的组件，在组件的属性PROPS上都默认添加了三个属性：
 *     HISTORY
 *        PUSH  向池子中追加一条新的信息，达到切换到指定路由地址的目的
 *              this.props.history.push('/plan') JS中实现路由切换
 *        GO    跳转到指定的地址（传的是数字 0当前 -1上一个 -2上两个...）
 *        GO-BACK  <=> GO(-1) 回退到上一个地址
 *        GO-FORWARD <=> GO(1) 向前走一步
 *        ...
 *
 *     LOCATION 获取当前哈希路由渲染组件的一些信息
 *        PATHNAME：当前哈希路由地址   /custom/list
 *        SEARCH：当前页面的问号传参值  ?lx=unsafe
 *        STATE：基于REDIRECT/LINK/NAV-LINK中的TO，传递是一个对象，对象中编写的STATE，就可以在LOCATION.STATE中获取到
 *
 *     MATCH  获取的是当前路由匹配的一些结果
 *       PARAMS：如果当前路由匹配的是地址路径参数，则这里可以获取传递参数的值
 */

class Nav extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log(props);
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