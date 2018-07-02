import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:9999';
axios.defaults.withCredentials = true; // 允许跨域请求携带凭证
axios.interceptors.response.use(function (res) {
    return res.data;
});

export default axios;