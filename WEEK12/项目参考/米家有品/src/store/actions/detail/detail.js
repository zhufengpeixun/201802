import * as Types from '../../action-types'
import {getCommodity} from '../../../api/api'

export let getDetailAPI = (gid) => {
    return function (dispatch, getState) {
        getCommodity(gid).then(function (data) {
            dispatch({type: Types.GET_DETAIL, detail: data});
        })
    }
};

export default {
    getDetailAPI
}



