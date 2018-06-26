import * as TYPE from '../action-types';
/*
 * 1. 如果REDUX中原有的状态不存在,我们会设置一个初始值
 */
export default function vote(state = {
    title: '',
    n: 0,
    m: 0
}, action) {
    switch (action.type) {
        case TYPE.VOTE_SUPPORT:
            state = {...state, n: state.n + 1};
            break;
        case TYPE.VOTE_AGAINST:
            state = {...state, m: state.m + 1};
            break;
        case TYPE.VOTE_INIT:
            //=>初始化的时候ACTION行为对象中可能不仅有TYPE,而且还有其它需要初始化的信息值，例如：{TYPE:...,TITLE:xxx,N:xx,M:xx...}
            /*state = {...state};
            for (let attr in action) {
                if (action.hasOwnProperty(attr)) {
                    if (attr === 'type') continue;
                    state[attr] = action[attr];
                }
            }*/
            let {title = '', n = 0, m = 0} = action;
            state = {...state, title, n, m};
            break;
    }
    return state;
}