import axios from './index';

//获取商品详情内容
export let getDetail = (id) => axios.get(`/detail/${id}`);