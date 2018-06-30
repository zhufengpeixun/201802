import {combineReducers} from 'redux';
import course from './course';
import person from './person';

let reducer = combineReducers({
    course,
    person
});
export default reducer;