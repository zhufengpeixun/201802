import * as TYPES from '../action-types';

let todo = {
    //=>增加任务信息
    add(payload) {
        return {
            type: TYPES.TODO_ADD,
            payload
        }
    }
};
export default todo;