/*
 * 合并所有的ACTION-CREATOR，类似于REDUCER合并，为了防止冲突，合并后的对象是以板块名称单独划分管理
 *   ACTION={
 *      vote:{
 *         xxx(){}
 *      },
 *      ...
 *   }
 */
import vote from './vote';
import personal from './personal';

let action = {
    vote,
    personal
};
export default action;