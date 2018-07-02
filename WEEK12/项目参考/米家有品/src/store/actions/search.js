import * as Types from '../search-types';
import {getHistory, searchInfo, clearHistorySearch, putHistory} from '../../api/api';

let actions = {
    getInitSearchAPI() {
        return (dispatch, getState) => {
            dispatch({type: Types.SEARCH_GET_INIT, payload: getHistory()})
        }
    },
    getSearchResultAPI(info) {
        return (dispatch, getState) => {
            dispatch({type: Types.SEARCH_RESULT, payload: searchInfo(info)})
        }
    },
    clearHistorySearchAPI() {
        return (dispatch, getState) => {
            dispatch({type: Types.SEARCH_CLEAR_HISTORY, payload: clearHistorySearch()})
        }
    },
    getInputValueAPI(val) {
        return {type: Types.GET_INPUT_VALUE, val}
    }
};

export default actions