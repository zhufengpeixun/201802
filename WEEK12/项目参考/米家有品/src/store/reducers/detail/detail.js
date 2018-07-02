import * as Types from '../../action-types'

let initDetail = {
    msg: '',
    err: 0
};
export default function detail(state = initDetail, action) {
    switch (action.type) {
        case Types.GET_DETAIL:
            return {...state, ...action.detail};
    }
    return state;
}


