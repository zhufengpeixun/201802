import * as Types from '../action-types';
import {getTvData, getTvImg} from '../../api/home';

let actions = {
    queryTVs() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_TV, payload: getTvData()})
        }
    },
    queryTVImg() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_TVIMG, payload: getTvImg()})
        }
    }
};

export default actions;
