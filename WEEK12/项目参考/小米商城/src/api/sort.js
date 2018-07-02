import axios from './index';

//获取分类页面左侧列表数据
export let getSortList = () => axios.get('/sortlist');
export let getCategoryList = () => axios.get('/categorylist');
