import * as Types from '../action-types'

let initSavour = {
    list: [],
    hasMore: true,
    isLoad: true
};


export let mySavour = (state = initSavour, action) => {
    if (action.type === Types.CHANGE_SAVOUR) {
        return {...state, ...action.savour, isLoad: true};
    }
    return state;
};

export default mySavour

