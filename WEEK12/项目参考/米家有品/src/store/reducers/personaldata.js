import * as Types from "../action-types";

let initState = {
    userInfo: {
        bill: {},
        collection: {},
        help: {},
        news: {},
        userid: "",
        userimg: "",
        username: ""
    }
};

export default function personaData(state = initState, action) {
    switch (action.type) {
        case Types.SET_PERSONAL_DATA:
            console.log(action.payload);
            return {...state, userInfo: action.payload};
    }
    return state;
}