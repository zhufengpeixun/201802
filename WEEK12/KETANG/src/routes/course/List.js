import React from 'react';
import {connect} from 'react-redux';
import {Carousel, Icon, Button} from 'antd';
import {Link} from 'react-router-dom';
import action from '../../store/action/index';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {isLoading: false};
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

    componentWillReceiveProps() {
        //=>在当前案例中，触发这个生命周期函数，说明传递给组件的属性改变了（路由重新渲染或者是REDUX容器中的状态改变了）
        this.setState({isLoading: false});
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

    loadMore = () => {
        let {queryList, courseData, courseType} = this.props;

        //=>防止重复点击
        if (this.state.isLoading) return;
        this.setState({isLoading: true});

        //=>重新发送新的DISPATCH：PAGE是在当前PAGE的基础上累加1，TYPE一定要沿用当前筛选的TYPE，FLAG点击加载更多，是向REDUX容器中追加新获取的信息
        queryList({
            page: courseData.page + 1,
            type: courseType,
            flag: 'push'
        });
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
                    {courseData.total <= courseData.page ? '' : (
                        <Button type='dashed' onClick={this.loadMore} loading={this.state.isLoading}>加载更多数据</Button>)}
                </div>) : '暂无数据'}
            </div>
        </div>;
    }
}

export default connect(state => ({...state.course}), action.course)(List);