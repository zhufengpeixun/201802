import * as Types from '../../action-types'
import {setCollection, toValidate, getCollLen, addCartData} from '../../../api/api'

let actions = {
    //验证是否登录
    getValidateAPI() {
        return function (dispatch, getState) {
            toValidate().then((data) => {
                dispatch({type: Types.DERAIL_LOGIN_J, DetailList: data})
            });
        }
    },

    getCollection(gid, type) {
        return function (dispatch, getState) {
            setCollection(gid, type).then((data) => {
                dispatch({type: Types.GET_COLLECT, collect: data})
            })
        }
    },

    //获取购物车初始数据
    getDetailCollLen() {
        return function (dispatch, getState) {
            getCollLen().then((data) => {
                dispatch({type: Types.GET_COLLEN, collLen: data.collLength})
            })
        }
    },
    //添加数据
    getDetailCart(gid) {
        return function (dispatch, getState) {
            addCartData(gid).then((data) => {
                dispatch({type: Types.DETAIL_CART, cart: data, addLen: data.collLength})
            })
        }
    }
};

export default actions




