import React, {PureComponent} from 'react';
import { Link } from 'react-router';
import './TodoItem.css';

export class TodoItem extends PureComponent {
    toggleTodo = () => {
        this.props.onToggleTodoDone({todoCategoryId: this.props.selectedCategory, todoIdx: this.props.idx})
    };

    render() {
        const {item, selectedCategory, idx} = this.props;
        const editLink = `/edit?category=${selectedCategory}&todo=${idx}`;
        console.log(editLink);

        return (
        <li className="todo-item list-group-item clearfix">
            <div className="todo-item__title checkbox pull-left">
                <input type="checkbox" id={`${idx}-${selectedCategory}`} defaultChecked={item.isDone} onChange={ this.toggleTodo}/>
                <label htmlFor={`${idx}-${selectedCategory}`}>
                    {item.title}
                </label>
            </div>
            <div className="pull-right action-buttons">
                <Link to={editLink}>
                    <button type="button" className="todo-item__btn-edit btn btn-link"><span className="glyphicon glyphicon-edit"></span></button>
                </Link>
            </div>
        </li>
        );
    }
}

