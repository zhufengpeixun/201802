import axios from './index';

//加入购物车  item:要加入购物车的商品信息
export let addCarts = (item) => axios.post('/addcarts', {item});
//修改购物车商品数量接口
export let updateCarts = (id, count) => axios.put('/shopcarts', {id, count});
//获取不同用户的购物车列表
export let getMyCarts = () => axios.post('/shopcarts');
//删除购物车商品  itemId:要删除商品的ID
export let removeCarts = (itemId) => axios.delete(`/shopcarts/${itemId}`);