import React from 'react';
import {connect} from 'react-redux';
import {Carousel, Icon, Button} from 'antd';
import {Link} from 'react-router-dom';
import action from '../../store/action/index';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    async componentDidMount() {
        let {queryBanner, bannerData, courseData, queryList} = this.props;
        if (!bannerData || bannerData.length === 0) {
            queryBanner();//=>DISPATCH
        }
        if (courseData.data.length === 0) {
            queryList();//=>DISPATCH
        }
    }

    queryType = () => {
        let {courseType} = this.props,
            text = '全部课程';
        switch (courseType) {
            case 'react':
                text = 'REACT框架开发课程';
                break;
            case 'vue':
                text = 'VUE框架开发课程';
                break;
            case 'xiaochengxu':
                text = '小程序开发课程';
                break;
        }
        return text;
    };

    render() {
        let {bannerData, courseType, courseData} = this.props,
            {data} = courseData;

        return <div className='listBox'>
            {/*轮播图*/}
            {bannerData && bannerData.length !== 0 ? (<Carousel autoplay>
                {bannerData.map((item, index) => {
                    let {name, pic} = item;
                    return <div key={index}>
                        <img src={pic} alt={name}/>
                    </div>;
                })}
            </Carousel>) : ''}

            {/*数据列表*/}
            <div className='courseList'>
                <h2><Icon type='menu-fold'/>{this.queryType()}</h2>
                {data && data.length !== 0 ? (<div>
                    <ul>
                        {data.map((item, index) => {
                            let {name, pic, dec, id, time} = item;
                            return <li key={index}>
                                <Link to={{
                                    pathname: '/course/info',
                                    search: `?courseId=${id}`
                                }}>
                                    <h3>{name}</h3>
                                    <div className='content'>
                                        <div className='pic'>
                                            <img src={pic} alt={name}/>
                                        </div>
                                        <div className='desc'>
                                            <p>{dec}</p>
                                            <p>时间：{time}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>;
                        })}
                    </ul>
                    <Button type='dashed'>加载更多数据</Button>
                </div>) : '暂无数据'}
            </div>
        </div>;
    }
}

export default connect(state => ({...state.course}), action.course)(List);