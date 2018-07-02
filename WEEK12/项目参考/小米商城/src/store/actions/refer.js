import * as Types from '../action-types';
import {getCommend, getCommendsData} from '../../api/home';


let actions = {
    queryCommends() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_COMMENDS, payload: getCommend()})
        }
    },
    queryCommendsImg() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_COMMENDS_IMG, payload: getCommendsData()})
        }
    }
};
export default actions;