import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import './LayoutEdit.css';
import {CategoryListEdit} from '../../components/category-list-edit';
import {TodoEdit} from '../../components/todo-edit'
import {TodoModal} from '../../components/modal';
import {
    TOGGLE_CATEGORY,
    EDIT_TODO,
    OPEN_MODAL,
    CLOSE_MODAL
} from '../../constants/actionTypes';

const mapStateToProps = state => ({
    ...state,
    category: state.routing.locationBeforeTransitions.query.category,
    newCategory: state.routing.locationBeforeTransitions.query.newCategory,
    todoIdx: state.routing.locationBeforeTransitions.query.todo,
    categoriesById: state.categoriesById.present,
    parentsCategories: state.parentsCategories.present,
    modal: state.modal
});

const mapDispatchToProps = dispatch => ({
    onToggleCategory: categoryId =>
        dispatch({type: TOGGLE_CATEGORY, payload: categoryId}),
    onEditTodo: todo =>
        dispatch({type: EDIT_TODO, payload: todo}),
    onOpenModal: (modalOptions) => {
        dispatch({ type: OPEN_MODAL, payload: modalOptions})
    },
    onCloseModal: () => {
        dispatch({ type: CLOSE_MODAL})
    },
});

class LayoutEditComponent extends Component {
    componentWillMount () {
        const {category, todoIdx, categoriesById} = this.props;
        if ((!category || !todoIdx) || (!categoriesById[category] || !categoriesById[category].todos[todoIdx])) {
            browserHistory.push({pathName: '/'});
        }
    }

    render() {
        const {
            category,
            newCategory,
            categoriesById,
            parentsCategories,
            todoIdx,
            onToggleCategory,
            onEditTodo,
            onOpenModal,
            onCloseModal,
            modal
        } = this.props,
        todo = category && todoIdx && categoriesById[category] && categoriesById[category].todos[todoIdx] ? categoriesById[category].todos[todoIdx]: {};

        return (
            <div className="layuot-main-container">
                <header>
                    <nav className="navbar navbar-inverse navbar-fixed-top">
                        <div className="container">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="#">{todo.title}</a>
                            </div>
                        </div>
                    </nav>
                </header>
                <main className="main container-fluid">
                    <div className="category-wrap col-xs-12 col-md-4">
                        <div className="category-list-wrap">
                            <CategoryListEdit
                                items={parentsCategories}
                                categoriesById={categoriesById}
                                onToggleCategory={onToggleCategory}/>
                        </div>
                    </div>
                    <TodoEdit
                        todo={todo}
                        onEditTodo={onEditTodo}
                        category={category}
                        newCategory={newCategory}
                        todoIdx={todoIdx}
                        onOpenModal={onOpenModal}
                        onCloseModal={onCloseModal}/>
                    <TodoModal
                        modal={modal}
                        onCloseModal={onCloseModal}/>
                </main>
            </div>
        );
    }
}


export const LayoutEdit = connect(mapStateToProps, mapDispatchToProps)(LayoutEditComponent);



