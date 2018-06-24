/*
 * 把每一个模块单独设定的REDUCER函数最后合并成为总的REDUCER
 *
 *   为了保证合并REDUCER过程中，每个模块管理的状态信息不会相互冲突，REDUX在合并的时候把容器中的状态进行分开管理（以合并REDUCER时候设置的属性名做为状态划分的属性名，把各个板块管理的状态放到自己的属性下即可）
 *   STATE={
 *      vote:{
 *         n:0,
 *         m:0
 *      },
 *      personal:{
 *         baseInfo:{}
 *      }
 *   }
 *
 *   以后获取状态信息的时候，也需要把VOTE等板块名加上了
 *   STORE.GET-STATE().VOTE.N
 */
import {combineReducers} from 'redux';
import vote from './vote';
import personal from './personal';

let reducer = combineReducers({
    vote,
    personal
});
export default reducer;