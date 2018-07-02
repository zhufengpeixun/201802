import * as Types from '../action-types';

let searchReducer = (state = {searchInfo: []}, action) => {
    switch (action.type) {
        case Types.SET_SEARCHINFO:
            return {...state, searchInfo: action.payload};
    }
    return state;
};

export default searchReducer;