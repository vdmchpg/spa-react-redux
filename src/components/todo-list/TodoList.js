import React, { PureComponent } from 'react';
import './TodoList.css';
import {TodoItem} from '../todo-item'
import {TodoAddPanel} from '../todo-add-panel'

export class TodoList extends PureComponent {

    componentWillReceiveProps () {
        const {items, todoFilter} = this.props;
        this.filterTodos(items, todoFilter);
    }

    filterTodos = (items, filter) => {
        if(filter) {
            let testString = new RegExp(filter, 'i');
            return items.filter(todo => {
                return testString.test(todo.title);
            });
        }
        return items
    };

    render() {
        const {items, onAddTodo, selectedCategory, onToggleTodoDone, showDoneTodos, todoFilter} = this.props;
        const testString = todoFilter ? new RegExp(todoFilter, 'i') : /./;

        return (
            <div className="todo-list-wrap col-xs-12 col-md-8">
                <TodoAddPanel
                    placeholder="Text input with button"
                    onAddValue={onAddTodo}
                    selectedCategory={selectedCategory}/>

                <ul className="todo-list list-group">
                    {items.map((item, i) => {
                        if (testString.test(item.title) && (!item.isDone || showDoneTodos)) {
                            return <TodoItem
                                key={i+item.title}
                                idx={i}
                                item={item}
                                selectedCategory={selectedCategory}
                                onToggleTodoDone={onToggleTodoDone}
                            />
                        }
                        return false;
                    })}
                </ul>
            </div>
        );
    }
}


