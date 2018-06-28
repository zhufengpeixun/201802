import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {data} = this.props;
        return <ul className='list-group'>
            {data.map((item, index) => {
                let {id, name} = item;
                /*
                 * <li onClick={ev => {this.props.history.push('/custom/detail');}}>
                 */
                return <li className='list-group-item' key={index}>
                    <Link to={{
                        // pathname: '/custom/detail',
                        // search: `?id=${id}`,//=>1.问号传参
                        // state: id //=>2.STATE传值
                        pathname: `/custom/detail/${id}`, //=>3.URL地址参数
                    }}>
                        编号：{id}
                        &nbsp;&nbsp;
                        姓名：{name}
                    </Link>
                </li>;
            })}
        </ul>;
    }
}

export default connect(state => ({...state.custom}))(List);

/*
 * 在SPA路由管控的项目中，从列表跳转到详情，总需要传递一些信息给详情组件，以此来展示不同的信息，传递给详情页信息的方式有好多种
 *   [不推荐]
 *     本地存储
 *     REDUX存储
 *     =>点击列表中某一项的时候，把信息存储到本地或者REDUX中，跳转到详情页面，把信息从本地或者REDUX中获取到即可，这样也算实现了信息的共享
 *
 *   [推荐]
 *     1. 问号传参
 *     2. 基于STATE传值（弊端：一旦页面刷新，上一次传递的STATE值就没有了）
 *     3. URL地址参数（把参数当做地址的一部分）
 *        path='/custom/detail/:id'
 */












