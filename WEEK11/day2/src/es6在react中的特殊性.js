import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Dialog extends React.Component {
    //=>这样是不符合ES6语法规范的，但是WEBPACK打包编译的时候会把它转换为Dialog.defaultProps这种复合规范的语法
    static defaultProps = {
        lx: '系统提示'
    };
    static propTypes = {
        con: PropTypes.string.isRequired
    };

    //=>类似的这样写也是可以的（不是合法的ES6语法，但是WEBPACK会把它编译 =>BABEL-PRESET-REACT）
    /*AA = 12;
    fn = () => {
        console.log(1);
    }*/

    constructor(props) {
        super(props);
    }

    render() {
        //=>this.props.con = '嘿嘿嘿';//=>Cannot assign to read only property 'con' of object  组件中的属性是调取组件的时候(创建类实例的时候)传递给组件的信息，而这部分信息是“只读”的（只能获取不能修改） =>“组件的属性是只读的”
        let {lx, con} = this.props;
        return <section>
            <h3>{lx}</h3>
            <div>{con}</div>
        </section>;
    }
}

ReactDOM.render(<div>
    珠峰培训
    <Dialog con='哈哈哈'/>
</div>, root);