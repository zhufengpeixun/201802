import * as TYPE from '../action-types';
/*
 * ACTION中处理的事情暂时感觉很无聊：就是封装几个方法（都是需要DISPATCH派发任务修改状态时候执行的方法），方法返回的是当前派发任务时候传递的ACTION对象
 *   REACT-REDUX中才会体验到这个封装的乐趣
 */
let vote = {
    support() {
        return {
            type: TYPE.VOTE_SUPPORT
        };
    },
    against() {
        return {
            type: TYPE.VOTE_AGAINST
        };
    },
    init(initData = {}) {
        return {
            type: TYPE.VOTE_INIT,
            ...initData
        };
    }
};
export default vote;