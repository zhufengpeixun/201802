import * as Types from "../action-types";

let initState = {
    login: {
        user: null,
        msg: "",
        success: "",
        err: 0
    }
};

function register(state = initState, action) {
    switch (action.type) {
        case Types.SET_USER_INFO:
            return {...action.user};
    }
    return state;
}

export default register;