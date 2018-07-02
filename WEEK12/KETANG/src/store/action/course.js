import * as TYPES from '../action-types';
import {queryBanner, queryList, queryShopCart} from '../../api/course';

let course = {
    queryBanner() {
        return async dispatch => {
            let bannerData = await queryBanner();
            dispatch({
                type: TYPES.COURSE_QUERY_BANNER,
                bannerData
            });
        }
    },
    queryList(payload = {}) {
        let {limit = 10, page = 1, type = 'all', flag = 'push'} = payload;
        return async dispatch => {
            let result = await queryList({
                limit,
                page,
                type
            });
            dispatch({
                type: TYPES.COURSE_QUERY_LIST,
                result,
                flag,
                courseType: type
            });
        }
    },
    queryUnpay() {
        return async dispatch => {
            let result = await queryShopCart(0);
            dispatch({
                type: TYPES.COURSE_UNPAY,
                result
            });
        }
    },
    queryPay() {
        return async dispatch => {
            let result = await queryShopCart(1);
            dispatch({
                type: TYPES.COURSE_PAY,
                result
            });
        }
    },

    //=>未支付列表选中态的操作
    handleSelect(mode) {
        //=>MODE：all->全选或者全不选  id(具体数字)->把某一个课程控制选择（注意：操作某一个的时候都要验证是否存在没选中的，如果没有，我们同时也得修改全选状态）
        return {
            type: TYPES.COURSE_HANDLE,
            mode
        }
    }
};
export default course;