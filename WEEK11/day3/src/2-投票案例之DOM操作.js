import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

/*class Vote extends React.Component {
    //=>组件传递的属性是只读的,我们为其设置默认值和相关规则
    static defaultProps = {};
    static propTypes = {
        title: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return <section className='panel panel-default' style={{width: '60%', margin: '20px auto'}}>
            <div className='panel-heading'>
                <h3 className='panel-title'>{this.props.title}</h3>
            </div>
            <div className='panel-body'>
                支持人数：<span ref='spanLeft'>0</span>
                <br/><br/>
                反对人数：<span ref='spanRight'>0</span>
                <br/><br/>
                支持率：<span ref='spanRate'>0</span>
            </div>
            <div className='panel-footer'>
                <button className='btn btn-success'
                        onClick={this.support}>支持
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className='btn btn-danger'
                        onClick={this.against}>反对
                </button>
            </div>
        </section>;
    }

    //=>投票:支持&&反对
    support = ev => {
        /!*
         * REFS：是REACT中专门提供通过操作DOM来实现需求的方式，它是一个对象，存储了当前组件中所有设置REF属性的元素（元素REF属性值是啥，REFS中存储的元素的属性名就是啥）
         * {
         *    spanLeft:span
         *    ...
         * }
         *!/
        let {spanLeft} = this.refs;
        spanLeft.innerHTML++;
        this.computed();
    };

    against = ev => {
        let {spanRight} = this.refs;
        spanRight.innerHTML++;
        this.computed();
    };

    computed = () => {
        let {spanLeft, spanRight, spanRate} = this.refs,
            n = parseFloat(spanLeft.innerHTML),
            m = parseFloat(spanRight.innerHTML),
            rate = (n + m) === 0 ? '0%' : ((n / (n + m) * 100).toFixed(2) + '%');
        spanRate.innerHTML = rate;
    };
}*/

class Vote extends React.Component {
    //=>组件传递的属性是只读的,我们为其设置默认值和相关规则
    static defaultProps = {};
    static propTypes = {
        title: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return <section className='panel panel-default' style={{width: '60%', margin: '20px auto'}}>
            <div className='panel-heading'>
                <h3 className='panel-title'>{this.props.title}</h3>
            </div>
            <div className='panel-body'>
                {/*
                  * ref='spanLeft'
                  *   是在当前实例上挂载一个属性refs（对象），存储所有的ref元素
                  *
                  * x => this.spanLeft = x
                  *   x代表当前元素，它的意思是，把当前元素直接挂载到实例上，后期需要用到元素，直接this.spanLeft获取即可
                  */}
                支持人数：<span ref={x => this.spanLeft = x}>0</span>
                <br/><br/>
                反对人数：<span ref={x => this.spanRight = x}>0</span>
                <br/><br/>
                支持率：<span ref={x => this.spanRate = x}>0%</span>
            </div>
            <div className='panel-footer'>
                <button className='btn btn-success'
                        onClick={this.support}>支持
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className='btn btn-danger'
                        onClick={this.against}>反对
                </button>
            </div>
        </section>;
    }

    //=>投票:支持&&反对
    support = ev => {
        let {spanLeft} = this;
        spanLeft.innerHTML++;
        this.computed();
    };

    against = ev => {
        let {spanRight} = this;
        spanRight.innerHTML++;
        this.computed();
    };

    computed = () => {
        let {spanLeft, spanRight, spanRate} = this,
            n = parseFloat(spanLeft.innerHTML),
            m = parseFloat(spanRight.innerHTML),
            rate = (n + m) === 0 ? '0%' : ((n / (n + m) * 100).toFixed(2) + '%');
        spanRate.innerHTML = rate;
    };
}

ReactDOM.render(<main>
    <Vote title='世界杯小组赛法国VS秘鲁，法国队必胜！'/>
    <Vote title='世界杯小组赛阿根廷VS克罗地亚，壮哉我大梅西！'/>
</main>, root);