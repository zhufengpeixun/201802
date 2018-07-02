import * as Types from "../../action-types";
import {editCartData, getUserInfo} from "../../../api/api";

let actions = {
    // 获取个人信息资料
    getToLoginAPI() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_PERSONAL_DATA, payload: getUserInfo()});
        }
    },
};

export default actions;