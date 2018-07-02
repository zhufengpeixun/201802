import * as Types from '../search-types';

let initState = {
    detailSearch: '',
    searchResult: [],
    hot: [],
    history: [],
    searchVal: ''
};

function search(state = initState, action) {
    switch (action.type) {
        case Types.SEARCH_GET_INIT:
            return {...state, ...action.payload};
        case Types.SEARCH_RESULT:
            return {...state, searchResult: action.payload};
        case Types.SEARCH_CLEAR_HISTORY :
            return {...state, history: []};
        case Types.GET_INPUT_VALUE:
            return {...state, searchVal: action.val};
    }
    return state;
}

export default search;