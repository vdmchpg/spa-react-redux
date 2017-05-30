import {
    OPEN_MODAL,
    CLOSE_MODAL
} from '../constants/actionTypes';

import categoriesMock from '../mocks/categories';

export default (state = categoriesMock.modal, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {...action.payload, open: true};
        case CLOSE_MODAL:
            return {...state, open: false};
        default:
            return state;
    }
};
