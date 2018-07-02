import {combineReducers} from 'redux';
import main from './main';
import mySavour from './savour';
import goodscategory from './goodscategory';
import cart from './cart';
import register from "./register";
import login from "./login";
import detail from "./detail/detail";
import evaluate from "./detail/evaluate";
import isDetail from './detail/isDetailLogin';
import search from "./search";
import personaldata from "./personaldata";
import pay from './pay';

// 合并reducers
let reducer = combineReducers({
    cart,
    personaldata,
    main,
    mySavour,
    register,
    login,
    goodscategory,
    detail,
    evaluate,
    isDetail,
    search,
    pay
});

export default reducer;