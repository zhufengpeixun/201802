import React from 'react';
import {connect} from 'react-redux';
import actions from '../../store/actions/detail';
import ReactModal from 'react-modal'
import "./detail.less";
import a from '../../common/img/icon-gogo.png';
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import {Link} from 'react-router-dom';
import {validate} from "../../api/session";
import '../../components/NotFound/NotFound';
import NotFound from "../../components/NotFound/NotFound";

ReactModal.setAppElement('#root');
const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    content: {
        position: 'fixed',
        width: '55%',
        height: '21%',
        bottom: '40%',
        left: '50%',
        transform: 'translateX(-50%)',
        boxSizing: 'border-box',
        paddingTop: '12%',
        outline: 'none',
        border: 0,
        background: 'rgba(0, 0, 0, .6)',
        borderRadius: '10%',
        color: '#FFF',
        textAlign: 'center',
        fontSize: '.3rem'
    }
};
@connect(state => ({...state}), actions)
export default class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            detail: {},
            err: 0
        }
    }

    async componentWillMount() {
        let userInfo = await validate();
        let {err} = userInfo;
        this.setState({
            err
        })
    }

    componentDidMount() {
        //    console.log(this.props.match.params.id);
        this.props.queryDetail(this.props.match.params.id);
    }


    handleOpenModal = (detail) => {
        this.setState({
            showModal: true
        });
        //   console.log(detail);
        //  console.log(this.props);
        this.props.addCart(detail);
    }
    handleOnAfter = () => {
        setTimeout(() => {
            this.setState({
                showModal: false
            });
        }, 500)
    }

    render() {
        let {detail} = this.props.detail;
        let {sliderList, title, curPrice, desc, price} = detail;
        if (!detail.title) {
            return <div>
                <NotFound/>
            </div>
        } else {
            return <div>
                <div className="container">
                    <header>
                        <div className="fill-height">
                            <a className="header-btn">
                                <i className="header-icon icon-back" onClick={() => this.props.history.goBack()
                                }></i>
                            </a>
                            <div className="placeholder"></div>
                            <a href="" className="header-btn share-btn">
                                <i className="header-icon icon-share"></i>
                            </a>
                        </div>
                    </header>
                    <ProductSlider list={sliderList}/>
                    <div className="overview">
                        <div className="goods-name">
                            {title}
                        </div>
                        <div className="goods-brief">
                            <span color="#ff4a00">{'「 ' + desc + ' 」'}</span>
                        </div>
                        <div className="goods-price">
                            <div className="price cur-price">{'￥' + curPrice}</div>
                            {curPrice === price ? null : <div className="price origin-price">{'￥' + price}</div>}
                            {curPrice === price ? null :
                                <div className="price-tips"><span>{'直降' + (price - curPrice)}</span></div>}
                        </div>
                    </div>
                    <div className="product-section">
                        <div className="border-top-1px">
                            <div className="title">促销</div>
                            <div className="pt1-2x">
                                <div className="act-icon">
                                    <div className="icon-desc">赠品</div>
                                    <div className="icon-title">无限流量米粉卡 含100元话费</div>
                                </div>
                            </div>
                        </div>
                        <i className="iconfont icon-icon-test"></i>
                    </div>
                    <div className="product-section padding-selected">
                        <div className="title">已选</div>
                        <div className="sec_cargo">
                            <div className="info">{title + '  x1'}</div>
                        </div>
                        <i className="iconfont icon-icon-test"></i>
                    </div>

                </div>
                <div className="footer">
                    <div className="fill-height">
                        <Link to="/home" className="footer-btn">
                            <i className="footer-icon icon-myhome"></i>
                            <span>首页</span>
                        </Link>
                        <Link to={{pathname: "/cart", state: detail}} className="footer-btn">
                            <i className="footer-icon icon-mycargo"></i>
                            <span>购物车</span>
                        </Link>
                        <a className="buy-btn" onClick={this.handleOpenModal.bind(this, detail)}>加入购物车</a>
                    </div>
                </div>
                <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example"
                            onAfterOpen={this.handleOnAfter} className="modal" style={customStyles}>
                    {this.state.err ? "请先登录再加入购物车!" : "加入购物车成功!"}
                </ReactModal>
            </div>
        }
    }
}