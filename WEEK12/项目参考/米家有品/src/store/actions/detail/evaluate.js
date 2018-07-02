import * as Types from '../../action-types'
import {getEvaluate} from '../../../api/api'

export let getEvaluateAPI = (gid) => {
    return function (dispatch, getState) {
        getEvaluate(gid).then(function (data) {
            dispatch({type: Types.GET_EVALUATE, evaluate: data});
        })
    }
};
export default {
    getEvaluateAPI
}

