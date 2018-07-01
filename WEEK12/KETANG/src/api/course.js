import axios from './index';

//=>获取轮播图数据
export function queryBanner() {
    return axios.get('/course/banner');
}