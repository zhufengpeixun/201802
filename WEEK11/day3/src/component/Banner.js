import React from 'react';
import PropTypes from 'prop-types';
import '../static/css/banner.css';

export default class Banner extends React.Component {
    //=>设置属性的默认值和规则
    static defaultProps = {
        data: [],
        interval: 3000,
        step: 1,
        speed: 300
    };
    static propTypes = {
        data: PropTypes.array,
        interval: PropTypes.number,
        step: PropTypes.number,
        speed: PropTypes.number
    };

    constructor(props) {
        super(props);

        //=>INIT STATE
        let {step, speed} = this.props;
        this.state = {
            step,
            speed
        };
    }

    //=>数据的克隆
    componentWillMount() {
        let {data} = this.props,
            cloneData = data.slice(0);
        cloneData.push(data[0]);
        cloneData.unshift(data[data.length - 1]);
        this.cloneData = cloneData;//=>挂载到实例上供其它方法调用
    }

    //=>自动轮播
    componentDidMount() {
        //=>把定时器返回值挂载到实例上，方便后期清除：结束自动轮播
        this.autoTimer = setInterval(this.autoMove, this.props.interval);
    }

    componentWillUpdate(nextProps, nextState) {
        //=>边界判断：如果最新修改的STEP索引大于最大索引（说明此时已经是末尾了，不能在向后走了），我们让其立即回到（无动画）索引为1的位置
        if (nextState.step > (this.cloneData.length - 1)) {
            this.setState({
                step: 1,
                speed: 0
            });
        }
    }

    componentDidUpdate() {
        //=>只有是从克隆的第一张立即切换到真实第一张后，我们才做如下处理：让其从当前第一张运动到第二张即可
        let {step, speed} = this.state;
        if (step === 1 && speed === 0) {
            //=>为啥要设置定时器延迟：CSS3的TRASITION有一个问题（主栈执行的时候，短时间内遇到两次设置TRANSITION-DRRATION的代码，以最后一次设置的为主）
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
        let {data} = this.props,
            {cloneData} = this;
        if (data.length === 0) return '';

        //=>控制WRAPPER的样式
        let {step, speed} = this.state,
            wrapperSty = {
                width: cloneData.length * 1000 + 'px',
                left: -step * 1000 + 'px',
                transition: `left ${speed}ms linear 0ms`
            };

        return <section className='container'>
            <ul className='wrapper' style={wrapperSty}>
                {cloneData.map((item, index) => {
                    let {title, pic} = item;
                    return <li key={index}>
                        <img src={pic} alt={title}/>
                    </li>;
                })}
            </ul>
            <ul className='focus'>
                {data.map((item, index) => {
                    let tempIndex = step - 1;
                    step === 0 ? tempIndex = data.length - 1 : null;
                    step === (cloneData.length - 1) ? tempIndex = 0 : null;
                    return <li className={tempIndex === index ? 'active' : ''}
                               key={index}></li>;
                })}
            </ul>
            <a href="javascript:;" className="arrow arrowLeft"></a>
            <a href="javascript:;" className="arrow arrowRight"></a>
        </section>;
    }

    //=>向右切换
    autoMove = () => {
        this.setState({
            step: this.state.step + 1
        });
    };
}