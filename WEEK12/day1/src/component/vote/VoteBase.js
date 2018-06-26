import React from 'react';
import action from '../../store/action'

export default class VoteBase extends React.Component {
    constructor(props) {
        super(props);
        /*
         * 真实项目中我们会把REDUX容器中的状态信息获取到，赋值给组件的状态或者是属性(REACT-REDUX)，这么做的目的是：当REDUX中的状态改变，我们可以修改组件内部的状态，从而达到重新渲染组件的目的
         */

        let reduxState = this.props.store.getState().vote;
        this.state = {
            ...reduxState //=>包含title/n/m所有管理的属性
        };
    }

    //=>在第一次加载执行，通过行为派发(VOTE_INIT)把REDUX中的信息赋值初始值
    componentWillMount() {
        this.props.store.dispatch(action.vote.init({
            title: '我长的帅不帅！',
            n: 0,
            m: 100
        }));
        let reduxState = this.props.store.getState().vote;
        this.setState({...reduxState});
    }

    //=>向发布订阅事件池中追加一个方法：监听REDUX容器中状态改变，状态改变重新渲染组件
    componentDidMount() {
        this.props.store.subscribe(() => {
            let reduxState = this.props.store.getState().vote;
            this.setState({...reduxState});
        });
    }

    render() {
        return <div className='panel panel-default'>
            <div className='panel-heading'>
                <h3 className='panel-title'>
                    {this.state.title}
                </h3>
            </div>
            <div className='panel-body'>
                支持人数：<span>{this.state.n}</span>
                <br/><br/>
                反对人数：<span>{this.state.m}</span>
            </div>
        </div>;
    }
}