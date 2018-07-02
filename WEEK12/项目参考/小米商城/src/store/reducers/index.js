import {combineReducers} from 'redux';
import computer from './computer';
import tv from "./tv";
import smart from './smart';
import phone from './phone';
import session from './session';
import detail from './detail';
import cart from './cart';
import refer from './refer';
import search from './search';

export default combineReducers({
    computer,
    tv,
    smart,
    phone,
    session,
    detail,
    cart,
    refer,
    search
})