import React from 'react';
import {connect} from 'react-redux';
import Qs from 'qs';

class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        /*
        //1.问号传参
        let {location: {search}, data} = this.props,
            customID = Qs.parse(search.substr(1)).id || 0;
        customID = parseFloat(customID);
        */

        /*
        //=>2.基于STATE传值
        let {location: {state}, data} = this.props,
            customID = state || 0;
        customID = parseFloat(customID);
        */

        //=>3.URL地址参数
        let {match: {params}, data} = this.props,
            customID = params.id || 0;//=>path='/custom/detail/:id' 路由冒号后面的值就是以后解析时候的属性名
        customID = parseFloat(customID);

        //=>筛选和渲染
        let item = data.find(item => parseFloat(item.id) === customID);
        if (!item) return '当前用户不存在!';
        return <div>
            编号：{item.id}
            <br/>
            姓名：{item.name}
        </div>;
    }
}

export default connect(state => ({...state.custom}))(Detail);