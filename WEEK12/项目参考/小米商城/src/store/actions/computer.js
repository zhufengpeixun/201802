import * as Types from '../action-types';
import {getComputerData, getImgComputer} from '../../api/home';

let actions = {
    queryComputers() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_COMPUTER, payload: getComputerData()})
        }
    },
    queryComputerImg() {
        return function (dispatch, getState) {
            dispatch({type: Types.SET_COMOUTERIMG, payload: getImgComputer()});
        }
    }
};

export default actions;
