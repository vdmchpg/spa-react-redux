import {
    ADD_CATEGORY,
    DELETE_CATEGORY
} from '../constants/actionTypes';

import categoriesMock from '../mocks/categories';
import undoable from 'redux-undo';

export const parentsCategories = (state = categoriesMock.parentsCategories, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            const {id} = action.payload;
            return [...state, id];
        case DELETE_CATEGORY:
            return state.filter(item => item !== action.payload);
        default:
            return state;
    }
};

const undoParentsCategories = undoable(parentsCategories);

export default undoParentsCategories;