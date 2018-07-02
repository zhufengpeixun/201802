import * as Types from "../cart-types";

let initState = {
    userCart: [],
    recommend: [],
    detailCart: []
};

export default function carts(state = initState, action) {
    switch (action.type) {
        // 获取是否登录状态
        case Types.GET_CART_DATA:
            let actionData = action.payload.userCart;
            let backData = [];
            for (let i = 0; i < actionData.length; i++) {
                let status = backData.find((item) => {
                    return item.from === actionData[i].from;
                });
                if (status) {
                    status.items.push(actionData[i]);
                } else {
                    backData.push({
                        from: actionData[i].from,
                        minfreight: actionData[i].minfreight,
                        items: [actionData[i]]
                    });
                }
            }
            return {
                ...state,
                userCart: backData,
                recommend: action.payload.recommend,
                detailCart: action.payload.userCart
            };

    }
    return state;
}