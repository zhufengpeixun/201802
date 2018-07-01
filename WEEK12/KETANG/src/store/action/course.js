import * as TYPES from '../action-types';
import {queryBanner} from '../../api/course';

let course = {
    queryBanner() {
        return async dispatch => {
            let bannerData = await queryBanner();
            dispatch({
                type: TYPES.COURSE_QUERY_BANNER,
                bannerData
            });
        }
    }

};
export default course;