import * as Types from '../action-types';

let ReferReducer = (state = {list: {}, imgList: {}}, action) => {
    switch (action.type) {
        case Types.SET_COMMENDS:
            return {...state, list: {...action.payload}};
        case Types.SET_COMMENDS_IMG:
            return {...state, imgList: {...action.payload}};
    }
    return state;
};

export default ReferReducer;