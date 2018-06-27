import * as TYPES from '../action-types';

let todo = {
    //=>增加任务信息
    add(payload) {
        return {
            type: TYPES.TODO_ADD,
            payload
        }
    },

    //=>更新筛选的类别:TEXT(ALL/COMPLETE/UNCOMPLETE)
    filter(text) {
        return {
            type: TYPES.TODO_FILTER,
            text
        }
    }
};
export default todo;