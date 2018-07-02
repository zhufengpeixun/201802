import * as Types from '../action-types'

let initState = {
    listLink: [],
    banner: {G0001: {url: ""}},
    data: [],
    listCurrentID: "G0001"
}


function goodscategory(state = initState, action) {
    switch (action.type) {
        case Types.SET_GOODSDATA:
            return {...state, ...action.payload};
        case Types.SET_GOODS_LEVEL_DATA:
            return {...state, data: [...action.payload.data]};
        case Types.SET_LINKLIST_CURRENTID:
            return {...state, listCurrentID: action.listCurrentID};
    }
    return state;
}

export default goodscategory