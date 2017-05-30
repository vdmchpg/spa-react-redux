import {
    TOGGLE_CATEGORY,
    ADD_TODO,
    ADD_CATEGORY,
    DELETE_CATEGORY,
    ADD_SUBCATEGORY,
    EDIT_CATEGORY,
    TOGGLE_TODO_DONE,
    EDIT_TODO
} from '../constants/actionTypes';
import categoriesMock from '../mocks/categories';
import undoable from 'redux-undo';

const categoriesById = (state = categoriesMock.categoriesById, action) => {
    switch (action.type) {
        case TOGGLE_CATEGORY:
            const toggledCategory = state[action.payload];

            return {
                ...state,
                [action.payload]: {
                    ...toggledCategory,
                    opened: !toggledCategory.opened
                }
            };
        case ADD_TODO:
            const category = state[action.payload.category];
            return {
                ...state,
                [action.payload.category]: {
                    ...category,
                    todos: [{title: action.payload.value, isDone: false},...category.todos]
                }
            };
        case ADD_CATEGORY:
            const {id, newCategory} = action.payload;
            return {
                ...state,
                [id]: newCategory
            };
        case DELETE_CATEGORY:
            const deletedCategory = state[action.payload];
            const newCategoriesById = {...state};

            deleteInParent(action.payload, newCategoriesById);
            deleteSubcategories (deletedCategory.subCategories, newCategoriesById);
            delete newCategoriesById[action.payload];

            return newCategoriesById;
        case ADD_SUBCATEGORY:
            const {subid, subCategory} = action.payload;
            const parent = {...state[subCategory.parent]};
            parent.subCategories.push(subid);
            return {
                ...state,
                [subCategory.parent]: parent,
                [subid]: subCategory
            };
        case EDIT_CATEGORY:
            const {editId, title} = action.payload;
            const editCategory = state[editId];
            return {
                ...state,
                [editId]: {
                    ...editCategory,
                    title
                }
            };
        case TOGGLE_TODO_DONE:
            const {todoCategoryId, todoIdx} = action.payload;
            const todoCategory = state[todoCategoryId];
            const todos = [...todoCategory.todos];
            todos[todoIdx].isDone = !todos[todoIdx].isDone;
            return {
                ...state,
                [todoCategoryId]: {
                    ...todoCategory,
                    todos
                }
            };
        case EDIT_TODO:
            const {prevCategory, moveCategory, todo, idx} = action.payload;
            const fromCategory = state[prevCategory];
            const toCategory = state[moveCategory];

            return moveCategory ?
                {
                    ...state,
                    [prevCategory]: {
                        ...fromCategory,
                        todos: fromCategory.todos.filter((item, i) => i !== +idx),
                    },
                    [moveCategory]: {
                        ...toCategory,
                        todos: [...toCategory.todos, todo],
                    }
                } :
                {
                    ...state,
                    [prevCategory]: {
                        ...fromCategory,
                        todos: fromCategory.todos.map((item, i) => i === +idx ? {...todo} : item)
                    },
                };
        default:
            return state;
    }
};

function deleteSubcategories(subcategories, target) {
    subcategories.forEach(item => {
        if(target[item].subCategories.length) {
            deleteSubcategories(target[item].subCategories, target);
        }
        delete target[item];
    });
}

function deleteInParent (child, target) {
    const {parent} = target[child];
    if (parent) {
        target[parent].subCategories = target[parent].subCategories.filter(item => item !== child);
    }
}

const undoCategoriesById = undoable(categoriesById);

export default undoCategoriesById