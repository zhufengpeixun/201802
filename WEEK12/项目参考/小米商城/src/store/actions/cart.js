import * as Types from '../action-types';
import {getMyCarts, removeCarts, updateCarts} from '../../api/carts';

let actions = {
    queryCart() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_CART, payload: getMyCarts()});
        }
    },
    deleteCart(id) {
        return function (dispatch, getState) {
            dispatch({type: Types.REMOVE_CART, payload: removeCarts(id)});
        }
    },
    updateCart(id, count) {
        return function (dispatch, getState) {
            dispatch({type: Types.UPDATE_CART, payload: updateCarts(id, count)})
        }
    }
};
export default actions;