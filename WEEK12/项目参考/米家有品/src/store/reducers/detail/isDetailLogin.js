import * as Types from '../../action-types'

let init = {
    detailList: [],
    collectList: {
        collState: ""
    },
    detailCollLen: {
        collLength: ""
    },
    detailCart: []
};

export default function isDetail(state = init, action) {
    if (action.type === Types.DERAIL_LOGIN_J) {
        return {...state, detailList: action.DetailList};
    }
    if (action.type === Types.GET_COLLECT) {
        return {...state, collectList: {collState: action.collect}};
    }
    if (action.type === Types.GET_COLLEN) {
        return {...state, detailCollLen: {collLength: action.collLen}}
    }
    if (action.type === Types.DETAIL_CART) {
        return {...state, detailCart: action.cart, detailCollLen: {collLength: action.addLen}}
    }
    return state;
}




