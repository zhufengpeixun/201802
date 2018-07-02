import * as Types from '../action-types';
import {getPhoneData, getPhoneImg} from '../../api/home';

let actions = {
    queryPhones() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_PHONE, payload: getPhoneData()})
        }
    },
    queryPhoneImg() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_PHONEIMG, payload: getPhoneImg()})
        }
    }
};

export default actions;
