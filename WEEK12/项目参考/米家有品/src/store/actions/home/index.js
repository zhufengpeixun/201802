import * as Types from "../../action-types";
import {getMainData} from "../../../api/api"

//首页初始化
function getHomeData(homeData) {
    return {type: Types.GET_HOME_DATA, homeData}

}

// //派发首页加载组件

// function getLoaderHomeData(gid) {
//     return function (dispatch,getState) {
//         dispatch({
//             type:Types.GET_LOADER_HOME_DATA,
//             payload:getMainData(gid)
//         }); //redux-promise的用法 可以将payload的promise执行，执行后将内容放到action.payload中进行派发 {type:'SET_SLIDERS',payload:[{},{},{}]}
//
//     }
// }
function getLoaderHomeData(hotData) {
    return {type: Types.GET_LOADER_HOME_DATA, hotData}
}

export default {
    getHomeData,
    getLoaderHomeData
};