import axios from 'axios';
import Qs from 'qs';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.transformRequest = (data = {}) => Qs.stringify(data);
axios.interceptors.response.use(result => result.data);
export default axios;