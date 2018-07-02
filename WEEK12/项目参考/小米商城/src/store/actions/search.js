import * as Types from '../action-types';
import {getSearch} from "../../api/search";

let actions = {
    querySearch(titleInfo) {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_SEARCHINFO, payload: getSearch(titleInfo)})
        }
    }
};

export default actions;