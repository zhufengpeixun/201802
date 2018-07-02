import * as Types from '../action-types';

let detailReducer = (state = {detail: {sliderList: []}, productAdd: {}}, action) => {
    switch (action.type) {
        case Types.SET_DETAIL:
            return {...state, detail: {...action.payload}};
        case Types.ADD_CART:
            return {...state, productAdd: {...action.payload}};
    }
    return state;
};

export default detailReducer;
