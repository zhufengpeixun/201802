import React from 'react';
import {connect} from 'react-redux';
import {Form, Icon, Input, Button, Checkbox, Modal} from 'antd';
import {Link} from 'react-router-dom';
import md5 from 'blueimp-md5';
import {login} from '../../api/person';
import action from '../../store/action/index';

const FormItem = Form.Item;

function loginFail() {
    const modal = Modal.error({
        title: '登录失败',
        content: '请稍后重新尝试!',
    });
    setTimeout(() => modal.destroy(), 2000);
}

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handleSubmit = ev => {
        ev.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let {userName, userPass} = values;
                userPass = md5(userPass);
                let result = await login({
                    name: userName,
                    password: userPass
                });
                if (parseFloat(result.code) === 0) {
                    this.props.queryBaseInfo();
                    //=>登录成功后我们需要重新获取已购买的课程信息（未登录下从服务获取的支付课程信息是获取不到的，但是登录后我们需要把购买信息同步到REDUX中，这样在我的课程中才能展示出来相关的信息）
                    this.props.queryPay();
                    this.props.history.go(-1);
                    return;
                }
                loginFail();
            }
        });
    };
    
    render() {
        const {getFieldDecorator} = this.props.form;
        return <div className='personLoginBox'>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {})(<Input prefix={<Icon type="user"/>} placeholder="用户名!"/>)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('userPass', {})(
                        <Input prefix={<Icon type="lock"/>} placeholder="密码!"
                               type="password"/>)}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    Or <Link to='/person/register'>register now!</Link>
                </FormItem>
            </Form>
        </div>;
    }
}

export default Form.create()(connect(null, {...action.person, ...action.course})(Login));