import React from 'react';
import ReactDOM from 'react-dom';

/*
 * 1.我们一般都把程序中的公用样式放到INDEX中导入，这样在其它组件中也可以使用了（WEBPACK会把所有的组件最后都编译到一起，INDEX是主入口）
 *
 * 2.导入bootstrap，需要导入的是不经过压缩处理的文件，否则无法编译（真实项目中bootstrap已经是过去事，我们后期项目中使用组件都是用ANT来做）
 */
import './static/css/reset.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Dialog from "./component/Dialog";

ReactDOM.render(<main>
    <Dialog content='马少帅长得很帅'/>

    <Dialog type={2} content='刘天瑞写的代码报错了！'/>

    <Dialog type='请登录' content={
        <div>
            <input type="text" className="form-control" placeholder="请输入用户名"/>
            <br/>
            <input type="password" className="form-control" placeholder="请输入密码"/>
        </div>
    }>
        <button className='btn btn-success'>登录</button>
        <button className='btn btn-danger'>取消</button>
    </Dialog>
</main>, root);


