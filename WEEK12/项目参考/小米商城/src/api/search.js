import axios from './index';

//获取搜索关键字段后的数据
export let getSearch = (titleInfo) => axios.post('/search', {titleInfo});