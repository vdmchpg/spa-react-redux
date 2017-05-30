import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import uuidV4 from 'uuid/v4';
import {ActionCreators as UndoActionCreators} from 'redux-undo'

import './LayoutMain.css';
import {TodoHeader} from '../../components/todo-header';
import {TodoProgressBar} from '../../components/todo-progress-bar';
import {CategoryList} from '../../components/category-list';
import {TodoList} from '../../components/todo-list';
import {TodoAddPanel} from '../../components/todo-add-panel';
import {TodoModal} from '../../components/modal';
import {
    CHANGE_SELECTED_CATEGORY,
    TOGGLE_CATEGORY,
    ADD_TODO,
    ADD_CATEGORY,
    EDIT_CATEGORY,
    DELETE_CATEGORY,
    ADD_SUBCATEGORY,
    OPEN_MODAL,
    CLOSE_MODAL,
    TOGGLE_TODO_DONE,
    TOGGLE_ALL_TODO_DONE,
    FILTER_TODOS
} from '../../constants/actionTypes';

const mapStateToProps = state => ({
    ...state,
    selectedCategory: state.selectedCategory.present,
    categoriesById: state.categoriesById.present,
    parentsCategories: state.parentsCategories.present,
    modal: state.modal,
    showDoneTodos: state.showDoneTodos.present,
    todoFilter: state.todoFilter.present,
    canUndo: state.categoriesById.past.length > 0,
    canRedo: state.categoriesById.future.length > 0
});

const mapDispatchToProps = dispatch => ({
    onChangeCategory: categoryId => {
        const {query} = browserHistory.getCurrentLocation();
        browserHistory.replace({query: {...query, selectedCategory: categoryId}});
        dispatch({ type: CHANGE_SELECTED_CATEGORY, payload: categoryId })
    },
    onToggleCategory: categoryId =>
        dispatch({ type: TOGGLE_CATEGORY, payload: categoryId }),
    onAddTodo:  todo => {
        if(todo.category) {
            dispatch({ type: ADD_TODO, payload: todo});
        }
    },
    onAddCategory:  category => {
        const id = uuidV4();
        dispatch({ type: ADD_CATEGORY, payload: {id: id, newCategory: {title: category.value, opened: false, todos: [], subCategories: []}}})
    },
    onEditCategory:  category => {
        dispatch({ type: EDIT_CATEGORY, payload: {editId: category.id, title: category.title} })
    },
    onAddSubcategory:  category => {
        const id = uuidV4();
        dispatch({ type: ADD_SUBCATEGORY, payload: {subid: id, subCategory: {parent: category.parent, title: category.value, opened: false, todos: [], subCategories: []}}})
    },
    onDeleteCategory:  id => {
        dispatch({ type: DELETE_CATEGORY, payload: id})
    },
    onOpenModal: (modalOptions) => {
        dispatch({ type: OPEN_MODAL, payload: modalOptions})
    },
    onCloseModal: () => {
        dispatch({ type: CLOSE_MODAL})
    },
    onToggleTodoDone: (todo) => {
        dispatch({ type: TOGGLE_TODO_DONE, payload: todo})
    },
    showAllDoneTodos: (show) => {
        const {query} = browserHistory.getCurrentLocation();
        show ? query.showDoneTodos = true : delete query.showDoneTodos;
        browserHistory.replace({query: {...query}});
        dispatch({ type: TOGGLE_ALL_TODO_DONE, payload: show})
    },
    onFilterTodos: (value) => {
        const {query} = browserHistory.getCurrentLocation();
        browserHistory.replace({query: {...query, todoFilter: value}});
        dispatch({ type: FILTER_TODOS, payload: value})
    },
    onUndo: (action) => {
        dispatch(UndoActionCreators.undo())
    },
    onRedo: () => {
        dispatch(UndoActionCreators.redo())
    },
});

class LayoutMainComponent extends Component {
    calculateProgress = () => {
        const {categoriesById, selectedCategory} = this.props;
        const {todos} = selectedCategory ? categoriesById[selectedCategory] : {todos : []};
        const doneTodos = todos.reduce((previousValue, currentValue) => {
            return previousValue + !!currentValue.isDone;
        }, 0);

        return todos.length ? (doneTodos/todos.length * 100).toFixed() : 0;
    };

    render() {
        const {
                selectedCategory,
                categoriesById,
                parentsCategories,
                onChangeCategory,
                onToggleCategory,
                onAddTodo,
                onAddCategory,
                onDeleteCategory,
                onAddSubcategory,
                onOpenModal,
                onCloseModal,
                modal,
                onEditCategory,
                onToggleTodoDone,
                showDoneTodos,
                showAllDoneTodos,
                onFilterTodos,
                todoFilter,
                canUndo,
                canRedo,
                onUndo,
                onRedo
            } = this.props,
            {todos} = categoriesById[selectedCategory] ? categoriesById[selectedCategory] : {todos: []};

        return (
            <div className="layuot-main-container">

                <TodoHeader
                    showAllDoneTodos={showAllDoneTodos}
                    showDoneTodos={showDoneTodos}
                    onFilterTodos={onFilterTodos}
                    todoFilter={todoFilter}/>
                <main className="main container-fluid">
                    <TodoProgressBar progress={this.calculateProgress()}/>
                    <div className="category-wrap col-xs-12 col-md-4">
                        <TodoAddPanel
                            placeholder="Enter category title"
                            onAddValue={onAddCategory}/>
                        <div className="category-list-wrap">
                            <CategoryList
                                items={parentsCategories}
                                onChangeCategory={onChangeCategory}
                                categoriesById={categoriesById}
                                onToggleCategory={onToggleCategory}
                                onDeleteCategory={onDeleteCategory}
                                onAddSubcategory={onAddSubcategory}
                                onOpenModal={onOpenModal}
                                onCloseModal={onCloseModal}
                                selectedCategory={selectedCategory}
                                onEditCategory={onEditCategory}/>
                        </div>
                    </div>
                    <TodoList
                        items={todos}
                        selectedCategory={selectedCategory}
                        onAddTodo={onAddTodo}
                        onToggleTodoDone={onToggleTodoDone}
                        showDoneTodos={showDoneTodos}
                        todoFilter={todoFilter}/>
                    <TodoModal
                        modal={modal}
                        onCloseModal={onCloseModal}/>
                    <p>
                        <button onClick={onUndo} disabled={!canUndo}>
                            Undo
                        </button>
                        <button onClick={onRedo} disabled={!canRedo}>
                            Redo
                        </button>
                    </p>
                </main>
            </div>
        );
    }
}

export const LayoutMain = connect(mapStateToProps, mapDispatchToProps)(LayoutMainComponent);

