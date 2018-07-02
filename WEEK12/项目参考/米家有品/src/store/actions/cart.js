import * as Types from "../cart-types";
import {getCartData} from '../../api/api'

let actions = {
    getDetailCartAPI() {
        return (dispatch) => {
            getCartData().then((data) => {
                dispatch({type: Types.GET_CART_DATA, payload: data})
            });
        }
    }
};

export default actions;