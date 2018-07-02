import * as Types from "../action-types";

let initState = {
    username: "",
    password: ""
};

function login(state = initState, action) {
    switch (action.type) {
        case Types.USER_LOGIN:
            return {...state, ...action.userLogin};
        case Types.USER_INFO_QUIT:
            return {...state, ...action.userQuit};
    }
    return state;
}

export default login;