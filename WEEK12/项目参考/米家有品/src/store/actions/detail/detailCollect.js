import * as Types from '../../action-types'
import {setCollection} from '../../../api/api'


//收藏
export let getCollection = (gid, type) => {
    return function (dispatch, getState) {
        setCollection(gid, type).then((data) => {
            dispatch({type: Types.GET_COLLECT, collect: data})
        })
    }
};

export default getCollection




