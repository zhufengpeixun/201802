import * as Types from '../action-types'
import {getGoodsData, getLevelData} from '../../api/api'

let actions = {
    //获取商品分类信息
    getGoodsDataAPI() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_GOODSDATA, payload: getGoodsData()});
        }
    },
    getLevelDataAPI(id) {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_GOODS_LEVEL_DATA, payload: getLevelData(id)});
        }
    },
    setLinkListCurrentID(id) {
        return {type: Types.SET_LINKLIST_CURRENTID, listCurrentID: id};
    }

};
export default actions;