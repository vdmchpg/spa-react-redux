import {CHANGE_SELECTED_CATEGORY} from '../constants/actionTypes';
import categoriesMock from '../mocks/categories';
import undoable from 'redux-undo';

export const selectedCategory = (state = categoriesMock.selectedCategory, action) => {
    switch (action.type) {
        case CHANGE_SELECTED_CATEGORY:
            return action.payload;
        case '@@router/LOCATION_CHANGE':
            return  action.payload.query.selectedCategory;
        default:
            return state;
    }
};

const undoSelectedCategory = undoable(selectedCategory);

export default undoSelectedCategory;