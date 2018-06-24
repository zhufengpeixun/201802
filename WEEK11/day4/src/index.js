import React from 'react';
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';

/*导入公共样式和资源*/
import './static/css/reset.min.css';
import './static/css/index.css';
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
/*
ReactDOM.render(<main>
    {/!*BANNER*!/}
    <Banner data={IMG_DATA}
            interval={1000}
            step={1}
            speed={300}/>

    <Banner data={IMG_DATA}
            interval={3000}/>
</main>, root);
*/

ReactDOM.render(<main>
    {/*基于组件实现轮播图*/}
    <ReactSwipe className={'container'}
                swipeOptions={{
                    auto: 2000
                }}>
        {IMG_DATA.map((item, index) => {
            let {pic, title} = item;
            return <div key={index}>
                <img src={pic} alt={title}/>
            </div>;
        })}
    </ReactSwipe>
</main>, root);