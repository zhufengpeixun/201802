import React from 'react';
import "./Main.less";
import MainHeader from "./MainHeader/MainHeader";
import MainSlider from "./MainSlider/MainSlider";
import MainLink from "./MainLink/MainLink";
import MainRecommend from "./MainRecommend/MainRecommend";
import MainCrowdfunding from "./MainCrowdfunding/MainCrowdfunding";
import MainHot from "./MainHot/MainHot";
import NewGoogs from "./NewGoods/NewGoogs";
import TimeBuy from "./TimeBuy/TimeBuy";
import MainBrand from "./MainBrand/MainBrand";
import MainPhone from "./MainPhone/MainPhone";
import MainMore from "./MainMore/MainMore";
import MainFooter from "./MainFooter/MainFooter";
import actions from "../../store/actions/home"
import {connect, Provider} from "react-redux";
import * as axiosData from "../../api/api.js";
import main from "../../store/reducers/main";
import store from "../../store/index";
import Loading from "../../components/Loading/Loading";
import {Spin} from 'antd';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            hot: [],
            newGoods: [],
            limit: [],
            brand: [],
            phone: [],
            allData: [],

        }
    }

    componentDidMount() {
        //首页首屏init渲染
        axiosData.mainInit().then(res => {

            this.props.getHomeData(res);
        }).catch(err => {
            console.log(err);
        })
        //热销
        axiosData.getMainData("G0019").then(res => {
            this.setState({
                hot: res
            })
            this.timer = setTimeout(this.n, 50000);

        }).catch(err => {
            console.log(err);
        })
        //新品
        axiosData.getMainData("G0020").then(res => {
            this.setState({
                newGoods: res
            })

        }).catch(err => {
            console.log(err);
        })
        //限时购
        axiosData.getMainData("G0021").then(res => {
            this.setState({
                limit: res
            })

        }).catch(err => {
            console.log(err);
        })

        //品牌
        axiosData.getMainData("G0017").then(res => {
            this.setState({
                brand: res
            })
        }).catch(err => {
            console.log(err);
        })
        //手机
        axiosData.getMainData("G0004").then(res => {
            this.setState({
                phone: res
            })

        }).catch(err => {
            console.log(err);
        })

        //更多
        axiosData.getMainData("G9999").then(res => {
            this.setState({
                allData: res
            })


        }).catch(err => {
            console.log(err);
        })


        //首页加载组件
        //  this.props.getLoaderHomeData("G0019");
        // let x= this.props.getLoaderHomeData("G0019");
        //  console.log(x);


    }

    render() {
        let {sliders, activity, recommend, crowdfunding} = this.props.homedata;
        let {hot: homeLoaderData, newGoods, limit, brand, phone, allData} = this.state;
        return (
            <div>
                {
                    recommend[0].url === ""
                        ? <div className="example"><Spin size="large"/></div>
                        : <Provider store={store}>
                            <div className="main-box" ref={x => this.ele = x}>
                                <MainHeader/>
                                <div className="cwj-main-body">
                                    <MainSlider sliders={sliders || []}/>
                                    <MainLink activity={activity || []}/>
                                    <MainRecommend recommend={recommend || []}/>
                                    <MainCrowdfunding crowdfunding={crowdfunding || []}/>
                                    <MainHot homeLoaderData={homeLoaderData || []}/>
                                    <NewGoogs newGoods={newGoods}/>
                                    <TimeBuy limit={limit}/>
                                    <MainBrand brand={brand}/>
                                    <MainPhone phone={phone}/>
                                    <MainMore allData={allData}/>
                                    <MainFooter/>
                                </div>
                            </div>
                        </Provider>
                }
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.main,
    }
}, {...actions})(Main)