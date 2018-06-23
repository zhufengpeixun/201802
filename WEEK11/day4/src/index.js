import React from 'react';
import ReactDOM from 'react-dom';

/*导入公共样式和资源*/
import './static/css/reset.min.css';
import Banner from "./component/Banner";

/*准备数据：在JSX中需要加载一些资源（例如IMG图片），此时我们不能使用相对地址，WEBPACK打包后资源地址都是要改变的，可以使用网络绝对地址或者基于模块规范把图片导入进来使用*/
let IMG_DATA = [];
for (let i = 1; i <= 3; i++) {
    IMG_DATA.push({
        id: i,
        title: '',
        pic: require(`./static/images/${i}.jpg`)
    });
}

/*RENDER渲染*/
ReactDOM.render(<main>
    {/*BANNER*/}
    <Banner data={IMG_DATA}
            interval={1000}
            step={1}
            speed={300}/>

</main>, root);