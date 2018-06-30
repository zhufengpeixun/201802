import * as TYPES from '../action-types';

let INIT_STATE = {};
export default function person(state = INIT_STATE, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {

    }
    return state;
};