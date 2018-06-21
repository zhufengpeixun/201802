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
    }

    //=>数据的克隆
    componentWillMount() {
        let {data} = this.props,
            cloneData = data.slice(0);
        cloneData.push(data[0]);
        cloneData.unshift(data[data.length - 1]);
        this.cloneData = cloneData;//=>挂载到实例上供其它方法调用
    }

    render() {
        let {data} = this.props,
            {cloneData} = this;
        if (data.length === 0) return '';

        return <section className='container'>
            <ul className='wrapper'>
                {cloneData.map((item, index) => {
                    let {title, pic} = item;
                    return <li key={index}>
                        <img src={pic} alt={title}/>
                    </li>;
                })}
            </ul>
            <ul className='focus'>
                {data.map((item, index) => {
                    return <li key={index}></li>;
                })}
            </ul>
            <a href="javascript:;" className="arrow arrowLeft"></a>
            <a href="javascript:;" className="arrow arrowRight"></a>
        </section>;
    }
}