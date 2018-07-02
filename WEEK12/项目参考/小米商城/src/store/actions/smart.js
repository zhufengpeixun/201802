import * as Types from '../action-types';
import {getSmart, getSmartImg} from '../../api/home';

let actions = {
    querySmarts() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_SMART, payload: getSmart()})
        }
    },
    querySmartImg() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_SMARTIMG, payload: getSmartImg()})
        }
    }
};

export default actions;
