import * as TYPES from '../action-types';

let custom = {
    //=>增加客户信息:PAYLOAD={ID,NAME}
    /*create(payload) {
        //=>THUNK中间件的使用语法：在指定执行派发任务的时候，等待3000MS后在派发
        return dispatch => {
            //=>DISPATCH都传递给我们了，我们想什么时候派发，自己搞定即可
            setTimeout(() => {
                dispatch({
                    type: TYPES.CUSTOM_CREATE,
                    payload
                });
            }, 3000);
        };
    }*/

    //=>PROMISE中间件的语法
    create(payload) {
        return {
            type: TYPES.CUSTOM_CREATE,
            //=>传递给REDUCER的PAYLOAD需要等待PROMISE成功，把成功的结果传递过去
            payload: new Promise(resolve => {
                setTimeout(() => {
                    resolve(payload);
                }, 3000);
            })
        }
    }
};
export default custom;