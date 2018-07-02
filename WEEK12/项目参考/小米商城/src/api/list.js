import axios from './index';

//获取分类页面中 二级列表中的数据
export let getList = (listId) => axios.get(`/list/${listId}`);