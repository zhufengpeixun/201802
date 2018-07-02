import * as Types from '../../action-types'

let initDetail = {
    list: []
};
export default function evaluate(state = initDetail, action) {
    switch (action.type) {
        case Types.GET_EVALUATE:
            return {...state, list: [...action.evaluate]};
    }
    return state;
}
