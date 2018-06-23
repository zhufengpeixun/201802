import React from 'react';
import ReactDOM from 'react-dom';
import Banner from "./component/Banner";

//=>公共的样式资源在INDEX中导入（组件独有的样式可以在组件内部导入）
import './static/css/reset.min.css';

//=>在REACT的JSX中需要使用图片等资源的时候，资源的地址不能使用相对地址（因为经过WEBPACK编译后，资源地址的路径已经改变了，原有的相对地址无法找到对应的资源），此时我们需要基于ES6 Module或者CommonJS等模块导入规范，把资源当做模块导入进来（或者我们使用的图片地址都是网络地址）
let IMG_DATA = [];
for (let i = 1; i <= 5; i++) {
    IMG_DATA.push({
        id: i,
        title: '',
        pic: require(`./static/images/${i}.jpg`)
    });
}

//=>调取组件渲染
ReactDOM.render(<main>
    {/*
      * DATA：轮播图需要绑定的数据 (空数组)
      * INTERVAL：自动轮播间隔的时间 (3000MS)
      * STEP：默认展示图片的索引（记住前后各克隆了一张） (1)
      * SPEED：每一张切换所需要的运动时间 (300MS)
      */}
    <Banner data={IMG_DATA}
            interval={1000}
            step={1}
            speed={300}/>

    <div style={{margin: '20px auto'}}></div>

    <Banner data={IMG_DATA.slice(2)}
            interval={5000}
            step={3}/>
</main>, root);