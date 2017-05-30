import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import './TodoEdit.css';

export class TodoEdit extends Component {
    saveChanges = () => {
        const {category, newCategory, todoIdx} = this.props;
        this.props.onEditTodo({
            prevCategory:category,
            moveCategory: newCategory,
            todo : {
                title: this.tittleInput.value,
                isDone: this.doneInput.checked,
                description: this.descriptionInput.value,
            },
            idx: todoIdx
        });
        this.props.onCloseModal();
        browserHistory.goBack();
    };

    cancelChanges = () => {
        browserHistory.goBack();
    };

    openSaveChangesModal = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.onOpenModal({successCb: this.saveChanges, type:'confirm', title: 'Update Todo', text: 'Do you want to update this todo-item?', open: true});
    };

    render() {
        const {todo} = this.props;

        return (
        <div className="todo-edit col-xs-12 col-md-8">
            <div className="todo-edit__buttons">
                <button className="todo-edit__btn-save btn btn-primary" onClick={this.openSaveChangesModal}>Save Changes</button>
                <button className="todo-edit__btn-cancel btn btn-danger" onClick={this.cancelChanges}>Cancel</button>
            </div>
            <div className="todo-edit__title-input input-group">
                <input type="text"
                       className="form-control"
                       placeholder="Title"
                       defaultValue={todo.title}
                       ref={input => this.tittleInput = input}/>
            </div>
            <div className="todo-edit__done-chk checkbox pull-left">
                <input type="checkbox" id="checkbox1"
                       defaultChecked={todo.isDone}
                       ref={input => this.doneInput = input}/>
                <label htmlFor="checkbox1">Done</label>
            </div>

            <div className="form-group clearfix">
                <textarea className="form-control"
                          rows="5"
                          placeholder="Description"
                          defaultValue={todo.description}
                          ref={input => this.descriptionInput = input}/>
            </div>
        </div>
        );
    }
}

