import axios from './index';

//用户注册  userName:用户名  password:密码
export let register = (userName, password) => axios.post('/register', {userName, password});
//用户登录  userName:用户名  password:密码
export let login = (userName, password) => axios.post('/login', {userName, password});
//校验用户是否登录
export let validate = () => axios.get('/validate');
//用户退出
export let logout = () => axios.get('/logout');
