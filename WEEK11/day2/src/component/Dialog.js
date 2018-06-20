import React from 'react';

export default function Dialog(props) {
    let {type, content, children} = props;

    //=>自己处理的一些样式
    let objStyle = {
        width: '50%',
        margin: '10px auto'
    };

    //=>类型的处理
    let typeValue = type || '系统提示';
    if (typeof type === 'number') {
        switch (type) {
            case 0:
                typeValue = '系统提示';
                break;
            case 1:
                typeValue = '系统警告';
                break;
            case 2:
                typeValue = '系统错误';
                break;
        }
    }

    return <section className='panel panel-default' style={objStyle}>
        <div className='panel-heading'>
            <h3 className='panel-title'>{typeValue}</h3>
        </div>
        <div className='panel-body'>{content}</div>

        {/*如果传递了CHILDREN，我们把内容放到尾部中，不传递什么都不显示*/}
        {
            children ? <div className='panel-footer'>
                {React.Children.map(children, item => item)}
            </div> : null
        }
    </section>;
}