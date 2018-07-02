import * as Types from '../action-types'
import {getPayList} from '../../api/api'

let actions = {
    //获取商品分类信息
    getPayListAPI() {
        // return function (dispatch,getState) {
        //   dispatch({type:Types.SET_PAY_DATA,payload:getPayList()});
        // }
        return {type: Types.SET_PAY_DATA, payload: getPayList()}
    },

    getPayListPassWordAPI() {
        return {type: Types.SET_PAYP_DATA_PASSWORD, payload: getPayList()}
    }


};
export default actions;