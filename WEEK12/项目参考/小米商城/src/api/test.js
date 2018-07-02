import axios from './index';

let getSliders = (type) => {
    return axios.get('/sliders');
};