import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

/*HEAD*/
class Head extends React.Component {
    render() {
        return <div className='panel-heading'>
            <h3 className='panel-title'>
                {/*子组件通过属性获取父组件传递的内容*/}
                点击次数：{this.props.count}
            </h3>
        </div>;
    }
}

/*BODY*/
class Body extends React.Component {
    render() {
        return <div className='panel-body'>
            <button className='btn btn-success'
                    onClick={this.props.callBack}>点我啊!
            </button>
        </div>;
    }
}

/*PANEL*/
class Panel extends React.Component {
    constructor() {
        super();
        this.state = {n: 0};
    }

    fn = () => {
        //=>修改PANEL的状态信息
        this.setState({
            n: this.state.n + 1
        });
    };

    render() {
        return <section className='panel panel-default' style={{width: '50%', margin: '20px auto'}}>
            {/*父组件中在调取子组件的时候，把信息通过属性传递给子组件*/}
            <Head count={this.state.n}/>

            {/*父组件把自己的一个方法基于属性传递给子组件，目的是在子组件中执行这个方法*/}
            <Body callBack={this.fn}/>
        </section>;
    }
}

ReactDOM.render(<Panel/>, root);