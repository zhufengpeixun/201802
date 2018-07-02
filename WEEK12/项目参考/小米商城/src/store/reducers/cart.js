import * as Types from '../action-types';

let cartReducer = (state = {cartList: []}, action) => {
    switch (action.type) {
        case Types.SET_CART:
            return {...state, cartList: [...action.payload]};
        case Types.REMOVE_CART:
            return {...state, cartList: [...action.payload]};
        case Types.UPDATE_CART:
            return {...state, cartList: [...action.payload]};
    }
    return state;
};

export default cartReducer;
