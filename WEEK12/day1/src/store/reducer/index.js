import {combineReducers} from 'redux';
import vote from './vote';
import personal from './personal';

/*
 * 合并REDUCER的时候,为了保证每一个版块管理的状态信息不冲突,在REDUX中按照指定的名称单独划分版块的状态
 * {
 *   vote:{
 *     title:'',
 *     n:0,
 *     m:0
 *   },
 *   personal:{
 *     //=>以合并时候指定的属性名为主，作为最后划分管理的名字
 *   }
 * }
 */
let reducer = combineReducers({
    vote: vote,
    personal: personal
});
export default reducer;