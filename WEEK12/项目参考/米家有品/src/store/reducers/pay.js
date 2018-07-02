import * as Types from '../action-types'

let initState = {
    paylist: [],
    totalparice: 0
}


function pay(state = initState, action) {
    switch (action.type) {
        case Types.SET_PAY_DATA:
            let newPayList = [];
            if ({}.toString.call(action.payload) === "[object Array]") {
                action.payload.forEach((item) => {
                    let goodsGroup = newPayList.find(goodsgroup => {
                        return goodsgroup.from === item.from
                    });
                    if (goodsGroup) {
                        goodsGroup.goods.push(item);
                    } else {
                        newPayList.push({from: item.from, goods: [item]})
                    }
                });
            }
            return {...state, paylist: newPayList};
        case Types.SET_PAYP_DATA_PASSWORD:
            let total = 0;
            let paylist = action.payload;
            if ({}.toString.call(paylist) === "[object Array]") {
                paylist.forEach((item) => {
                    total += item.price * item.number
                });
            }
            return {...state, totalparice: total};
    }
    return state;
}

export default pay