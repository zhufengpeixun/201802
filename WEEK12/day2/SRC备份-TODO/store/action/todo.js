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
    },

    //=>更新指定任务的状态信息
    updateState(taskId, newState) {
        return {
            type: TYPES.TODO_UPDATE_STATE,
            taskId,
            newState
        }
    },

    //=>删除指定任务信息
    remove(taskId) {
        return {
            type: TYPES.TODO_DELETE,
            taskId
        };
    }
};
export default todo;