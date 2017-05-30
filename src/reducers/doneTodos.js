import {TOGGLE_ALL_TODO_DONE} from '../constants/actionTypes';
import undoable from 'redux-undo';

export const showDoneTodos = (state, action) => {
    switch (action.type) {
        case TOGGLE_ALL_TODO_DONE:
            return action.payload;
        case '@@router/LOCATION_CHANGE':
            return action.payload.query.showDoneTodos;
        default:
            return state;
    }
};

const undoShowDoneTodos = undoable(showDoneTodos);

export default undoShowDoneTodos;
