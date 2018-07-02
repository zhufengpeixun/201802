import * as Types from '../action-types';

let computerReducer = (state = {imgList: {}, list: {}}, action) => {
    switch (action.type) {
        case Types.SET_SMART:
            return {...state, list: {...action.payload}};
        case Types.SET_SMARTIMG:
            return {...state, imgList: {...action.payload}};

    }
    return state;
};

export default computerReducer;

