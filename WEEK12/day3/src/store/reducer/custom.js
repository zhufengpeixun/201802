import * as TYPES from '../action-types';

export default function custom(state = {}, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {

    }
    return state;
}