import * as TYPES from '../action-types';

export default function todo(state = {
    data: [],
    flag: 'all'
}, action) {
    state = JSON.parse(JSON.stringify(state));//=>为了防止不直接修改原有的状态信息，我们把原有的深度克隆一份，RETURN的结果才是覆盖原有的信息
    switch (action.type) {
        //=>增加任务信息:PAYLOAD传递进来需要增加的任务信息
        case TYPES.TODO_ADD:
            let {payload} = action;
            payload.id = state.data.length === 0 ? 1 : (parseFloat(state.data[state.data.length - 1]['id']) + 1);
            state.data.push(payload);
            break;
    }
    return state;
}