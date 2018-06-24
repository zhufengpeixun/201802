/*
 * store
 *   reducer  存放每一个模块的reducer
 *      vote.js
 *      personal.js
 *      ...
 *      index.js 把每一个模块的reducer最后合并成为一个reducer
 *
 *   action  存放每一个模块需要进行的派发任务(ActionCreator)
 *      vote.js
 *      personal.js
 *      ...
 *      index.js  所有模块的ACTION进行合并
 *
 *   action-types.js  所有派发任务的行为标识都在这里进行宏观管理
 *   index.js  创建STORE
 */

import {createStore} from 'redux';
import reducer from './reducer';//<=>'./reducer/index'

let store = createStore(reducer);
export default store;