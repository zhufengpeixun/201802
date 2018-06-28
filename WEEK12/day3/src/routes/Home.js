import React from 'react';
import {connect} from 'react-redux';

/*ANTD*/
//=>LocaleProvider:国际化组件，目的是把组件汉化
import {LocaleProvider, DatePicker, Icon, Button, Calendar} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '../static/css/antd.css';


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false
        };
    }

    render() {
        //=>只要LocaleProvider包含的组件都是被汉化的
        return <LocaleProvider locale={zh_CN}>
            <div>
                {/*<div style={{width: '300px', margin: '10px'}}>
                    <Calendar/>
                </div>*/}

                {/*<Icon type='zhihu' style={{
                    fontSize: '22px',
                    color: 'red'
                }}/>*/}

                <Button type='danger' loading={this.state.loading}
                        onClick={ev => {
                            this.setState({loading: true});
                            setTimeout(() => {
                                this.setState({loading: false});
                            }, 3000);
                        }}>提交</Button>
            </div>
        </LocaleProvider>;
    }
}

export default connect()(Home);