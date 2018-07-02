import * as Types from "../action-types";
import {toRegister} from "../../api/api";

let actions = {
    toRegisterAPI(mobile, password, history) {
        return function (dispatch, getState) {
            toRegister(mobile, password).then((data) => {//data是服务端返回结果
                dispatch({type: Types.SET_USER_INFO, user: data});//不管成功与否都将信息存入redux
                if (data.err === 0) {
                    history.push("/login");//成功后跳到登录页
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
};

export default actions;