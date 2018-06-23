import React from 'react';
import '../static/css/banner.css';

export default class Banner extends React.Component {
    //=>组件的属性不可更改但是可以设置默认值
    static defaultProps = {
        data: [],
        interval: 3000,
        step: 1,
        speed: 300
    };

    constructor(props) {
        super(props);

        //=>初始化状态
        let {step, speed} = this.props;
        this.state = {
            step,
            speed
        };
    }

    componentWillMount() {
        /*数据克隆*/
        let {data} = this.props,
            cloneData = data.slice(0);
        cloneData.push(data[0]);
        cloneData.unshift(data[data.length - 1]);
        this.cloneData = cloneData;
    }

    componentDidMount() {
        /*开启自动轮播*/
        this.autoTimer = setInterval(this.moveRight, this.props.interval);
    }

    componentWillUpdate(nextProps, nextState) {
        /*向右边界判断：如果当前最新修改的STEP值已经大于最大的索引，说明不能继续向右走了，我们应该让其“立即”（无动画）回到真实第一张（STEP=1）*/
        if (nextState.step > (this.cloneData.length - 1)) {
            this.setState({
                step: 1,
                speed: 0
            });
        }
    }

    async componentDidUpdate() {
        /*向右边界判断：立即回到第一张后，我们应该让其运动到真实的第二张*/
        let {step, speed} = this.state;
        if (step === 1 && speed === 0) {
            let delayTimer = setTimeout(() => {
                clearTimeout(delayTimer);
                this.setState({
                    step: step + 1,
                    speed: this.props.speed
                });
            }, 0);
        }
    }

    render() {
        let {data, style} = this.props,
            {cloneData} = this;
        if (data.length === 0) return '';

        //=>计算WRAPPER样式
        let {step, speed} = this.state,
            wrapperStyle = {
                width: `${cloneData.length * 1000}px`,
                transform: `translateX(${-step * 1000}px)`,
                transition: `transform ${speed}ms`
            };

        return <section className={'container'}>
            <ul className={'wrapper'} style={wrapperStyle}>
                {cloneData.map((item, index) => {
                    let {pic, title} = item;
                    return <li key={index}>
                        <img src={pic} alt={title}/>
                    </li>;
                })}
            </ul>
            <ul className={'focus'}>
                {data.map((item, index) => {
                    return <li key={index}></li>;
                })}
            </ul>
            <a href="javascript:;" className="arrow arrowLeft"></a>
            <a href="javascript:;" className="arrow arrowRight"></a>
        </section>;
    }

    //=>向右切换:自动轮播或者点击有切换按钮
    moveRight = () => {
        this.setState({
            step: this.state.step + 1
        });
    };
}