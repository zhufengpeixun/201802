import * as Types from '../action-types';
import {getDetail} from '../../api/detail';
import {addCarts} from "../../api/carts";

let actions = {
    queryDetail(id) {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_DETAIL, payload: getDetail(id)});
        }
    },
    addCart(item) {
        return function (dispatch, getState) {
            dispatch({type: Types.ADD_CART, payload: addCarts(item)})
        }
    }
};
export default actions;