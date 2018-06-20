import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Dialog extends React.Component {
    /*THIS.PROPS是只读的，我们无法在方法中修改它的值，但是可以给其设置默认值或者设置一些规则（例如：设置是否是必须传递的以及传递值的类型等）*/
    static defaultProps = {
        lx: '系统提示'
    };

    /*PROP-TYPES是FACEBOOK公司开发的一个插件，基于这个插件我们可以给组件传递的属性设置规则（设置的规则不会影响页面的渲染，但是会在控制台抛出警告错误）*/
    static propTypes = {
        // con: PropTypes.string //=>传递的内容需要是字符串
        con: PropTypes.string.isRequired //=>不仅传递的内容是字符串，并且还必须传递
    };

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

    componentDidMount() {
        console.log(this.props.lx);
    }
}

ReactDOM.render(<div>
    珠峰培训
    <Dialog con='哈哈哈'/>
</div>, root);