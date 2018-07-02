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
    }
};
export default course;