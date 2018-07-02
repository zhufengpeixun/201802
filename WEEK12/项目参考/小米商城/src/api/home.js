import axios from './index';

//获取首页各部分轮播图数据   type:传入轮播图所属的分类
export let getSlider = (type) => axios.get(`/sliders/${type}`);
//获取推荐部分的全部数据
export let getCommend = () => axios.get('/commend');
//获取推荐部分的图片
export let getCommendsData = () => axios.get('/commendimg');
//获取智能部分的全部数据
export let getSmart = () => axios.get('/smart');
//获取电视部分的全部数据
export let getTvData = () => axios.get('/television');
//获取电脑部分的全部数据
export let getComputerData = () => axios.get('/computer');
//获取生活周边的全部数据
export let getLifeData = () => axios.get('/life');
//获取生活周边页面图片
export let getLifeImg = () => axios.get('/lifeimg');
//获取电脑部分的全部数据
export let getPhoneData = () => axios.get('/phone');
//获取全面屏页面中的商品分类前后图片上数据
export let getPhoneImg = () => axios.get('/phoneimg');
//获取电脑页面中商品分类前后图片数据
export let getImgComputer = () => axios.get('/comimg');
//获取智能页面中商品分类前后图片数据
export let getSmartImg = () => axios.get('/smartimg');
//获取电视页面中商品分类前后图片数据
export let getTvImg = () => axios.get('/tvimg');
