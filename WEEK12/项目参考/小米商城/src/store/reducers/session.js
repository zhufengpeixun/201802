import * as Types from '../action-types';

let initState = {
    user: null,
    msg: '',
    err: 0,
    success: ''
};

function sessionReducer(state = initState, action) {
    switch (action.type) {
        case Types.SET_USERINFO:
            return {...action.user};
        case Types.CLEAR_MESSAGE:
            return {...state, ...action.info};
    }
    return state;
}

export default sessionReducer;