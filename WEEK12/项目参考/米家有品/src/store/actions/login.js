import * as Types from "../action-types";
import {toLogin, signOut} from "../../api/api";

let actions = {
    toLoginAPI(username, password, history) {
        return function (getState, dispatch) {
            toLogin(username, password).then(data => {
                dispatch({type: Types.USER_LOGIN, userLogin: data});
                if (data.err === 0) {
                    history.push("/usercenter");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    },
    signOutAPI(username, history) {
        return function (getState, dispatch) {
            signOut(username).then(data => {
                dispatch({type: Types.USER_INFO_QUIT, userQuit: data});
                if (!data.user) {
                    history.push("/");
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
};

export default actions;