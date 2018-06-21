import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

class Temp extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '周啸天'
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({text: '珠峰培训'});
        }, 1000);
    }

    render() {
        let {text} = this.state;
        return <section className='panel panel-default'>
            <div className='panel-heading'>
                <input type="text" className='form-control'
                       value={text}
                       onChange={ev => {
                           //=>在文本框的ON-CHANE中修改状态信息：实现的是视图改变数据
                           this.setState({
                               text: ev.target.value
                           });
                       }}/>
            </div>
            <div className='panel-body'>
                {text}
            </div>
        </section>;
    }
}

ReactDOM.render(<Temp/>, root);