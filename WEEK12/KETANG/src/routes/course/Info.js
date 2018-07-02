import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import Qs from 'qs';
import {queryInfo, addShopCart, removeShopCart} from '../../api/course';
import action from '../../store/action/index';

class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: null,
            isShop: -1 //=>存储是否已经加入到购物车中 -1还没有加入购物车 0已加入但是未支付  1已支付
        };
    }

    async componentDidMount() {
        let {location: {search}} = this.props,
            {courseId = 0} = Qs.parse(search.substr(1)) || {};
        this.courseId = courseId;//=>挂载到实例上,目的是为了在其它方法中也可以调用
        let result = await queryInfo(courseId);
        if (parseFloat(result.code) === 0) {
            //=>校验当前的课程是已支付还是未支付，或者还未加入购物车
            let {pay, unpay} = this.props.shopCart,
                isShop = -1;
            //=>在REDUX未购买和已购买的集合中筛选是否有当前展示的课程，有的话说明当前课程已经加入到购物车了，没有说明还未加入
            unpay.find(item => parseFloat(item.id) === parseFloat(courseId)) ? isShop = 0 : null;
            pay.find(item => parseFloat(item.id) === parseFloat(courseId)) ? isShop = 1 : null;

            this.setState({
                data: result.data,
                isShop
            });
        }
    }

    render() {
        let {data, isShop} = this.state;
        if (!data) return '';

        return <div className='baseInfo'>
            <video
                src='http://220.194.121.22/vlive.qqvideo.tc.qq.com/A4xFObSna9R9BCHlj8Rc1FopTBXg2tFKbTj9OQWsjCHk/k0200hee7bb.p202.1.mp4?vkey=CB19122BDD31A398AD86E994E24989117184368BE7A736FED6C100B27B1DC651464477F8175D38EFF94DB4B6355985534557806FFCA29170D0B8A15317ED4C34D0C456476E8EFF297D26D9AF1502565DA86314B6C15C6D8D78E59535C1FBAA89FA76C4EE1210E6AB5B07E128BC2844A9D1F1AC68AE9271EB&platform=4100201&sdtfrom=&fmt=hd&level=0&locid=6e09f484-d99f-42c1-90d9-6017e097a34d&size=1134989&ocid=276501676'
                controls preload='none' poster={data.pic}/>
            <div className='content'>
                <h3>{data.name}</h3>
                <p>{data.dec}</p>
                <span>课程价格：{data.price}</span>

                {isShop !== 1 ? (<Button
                    type={isShop === -1 ? 'dashed' : ''}
                    onClick={this.handleShopCart}>
                    {isShop === -1 ? '加入购物车' : '从购物车移除'}
                </Button>) : ''}
            </div>
        </div>;
    }

    handleShopCart = async ev => {
        if (this.state.isShop === -1) {
            //=>还未加入购物车（按钮：加入购物车）
            let result = await addShopCart(this.courseId);
            if (parseFloat(result.code) === 0) {
                //=>DISPATCH派发任务：通知REDUX容器中的购物信息进行更新
                this.props.queryUnpay();

                //=>页面重新展示最新样式
                this.setState({isShop: 0});
            }
            return;
        }
        //=>已经加入购物车（按钮：移除购物车）
        let result = await removeShopCart(this.courseId);
        if (parseFloat(result.code) === 0) {
            this.props.queryUnpay();//=>更新购物车存储的数据
            this.setState({isShop: -1});
        }
    }
}

export default connect(state => state.course, action.course)(Info);