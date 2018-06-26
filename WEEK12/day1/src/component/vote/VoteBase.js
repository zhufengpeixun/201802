import React from 'react';
import {connect} from 'react-redux';
import action from '../../store/action'

/*
 * 相对于传统的REDUX，我们做的步骤优化
 *   1. 导出的不在是我们创建的组件，而是基于CONNECT构造后的高阶组件
 *   export default connect([mapStateToProps], [mapDispatchToProps])([自己创建的组件]);
 *
 *   2. REACT-REDUX帮我们做了一件非常重要的事情：以前我们需要自己基于SUBSCRIBE向事件池追加方法，以达到容器状态信息改变，执行我们追加的方法，重新渲染组件的目的，但是现在不用了，REACT-REDUX帮我们做了这件事：“所有用到REDUX容器状态信息的组件，都会向事件池中追加一个方法，当状态信息改变，通知方法执行，把最新的状态信息作为属性传递给组件，组件的属性值改变了，组件也会重新渲染”
 */


class VoteBase extends React.Component {
    /*constructor(props) {
        super(props);
        /!*
         * 真实项目中我们会把REDUX容器中的状态信息获取到，赋值给组件的状态或者是属性(REACT-REDUX)，这么做的目的是：当REDUX中的状态改变，我们可以修改组件内部的状态，从而达到重新渲染组件的目的
         *!/

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
    }*/

    constructor(props) {
        super(props);
        console.log(this.props);
    }

    componentWillMount() {
        this.props.init({
            title: '我长的帅不帅?',
            n: 0,
            m: 100
        });
    }

    render() {
        let {title, n, m} = this.props;

        return <div className='panel panel-default'>
            <div className='panel-heading'>
                <h3 className='panel-title'>
                    {title}
                </h3>
            </div>
            <div className='panel-body'>
                支持人数：<span>{n}</span>
                <br/><br/>
                反对人数：<span>{m}</span>
            </div>
        </div>;
    }
}

/*//=>把REDUX容器中的状态信息遍历，赋值给当前组件的属性（state）
let mapStateToProps = state => {
    //=>state:就是REDUX容器中的状态信息
    //=>我们返回的是啥，就把它挂载到当前组件的属性上（REDUX存储很多信息，我们想用啥就返回啥即可）
    return {
        ...state.vote
    };
};*/

/*
//=>把REDUX中的DISPATCH派发行为遍历，也赋值给组件的属性（ActionCreator）
let mapDispatchToProps = dispatch => {
    //=>dispatch:STORE中存储的DISPATCH方法
    //=>返回的是啥，就相当于把啥挂载到组件的属性上（一般我们挂载一些方法，这些方法中完成了DISPATCH派发任务操作）
    return {
        init(initData) {
            dispatch(action.vote.init(initData));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(VoteBase);
*/

export default connect(state => ({...state.vote}), action.vote)(VoteBase);//=>REACT-REDUX帮我们做了一件事情，把ACTION-CREATOR中编写的方法（返回ACTION对象的方法），自动构建成DISPATCH派发任务的方法，也就是mapDispatchToProps这种格式