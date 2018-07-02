import * as Types from '../action-types';
import {register, login, validate, logout} from "../../api/session";

let actions = {
    toReg(userName, password, history) {

        return function (dispatch, getState) {
            register(userName, password).then(function (data) {
                dispatch({type: Types.SET_USERINFO, user: data});

                if (data.err === 0) {

                    history.push('/login');

                }
            })
        }
    },
    toLogin(username, password, history) {
        return function (dispatch, getState) {
            login(username, password).then(function (data) {
                dispatch({type: Types.SET_USERINFO, user: data});
                if (data.err === 0) {
                    //  history.push('/user');
                    history.push('/home');

                }
            })
        }
    },
    toValidate() {
        return function (dispatch, getState) {
            validate().then(function (data) {
                dispatch({type: Types.SET_USERINFO, user: data});
            })
        }
    },
    clearMessage() {
        return {type: Types.CLEAR_MESSAGE, info: {msg: '', success: '', err: 0}}
    },
    toLogout(history) {
        return function (dispatch, getState) {
            logout().then(function (data) {
                if (data.err === 0) {
                    history.push('/user');
                }
            })
        }
    }
}
export default actions;