import {FILTER_TODOS} from '../constants/actionTypes';
import undoable from 'redux-undo';

export const todoFilter = (state, action) => {
    switch (action.type) {
        case FILTER_TODOS:
            return action.payload;
        case '@@router/LOCATION_CHANGE':
            return action.payload.query.todoFilter;
        default:
            return state;
    }
};


const undoTodoFilter = undoable(todoFilter);

export default undoTodoFilter;