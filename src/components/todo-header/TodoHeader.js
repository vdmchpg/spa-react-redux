import React, {PureComponent} from 'react';
import './TodoHeader.css';

export class TodoHeader extends PureComponent {
    toggleTodos = (e) => {
        this.props.showAllDoneTodos(e.target.checked)
    };

    filterTodos = (e) => {
        e.preventDefault();
        this.props.onFilterTodos(this.textInput.value);
    };

    clearSearchField = (e) => {
        this.textInput.value = '';
        this.props.onFilterTodos(null);
    };

    render() {
        const {showDoneTodos, todoFilter} = this.props;

        return (
            <header>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">To-Do-List</a>
                        </div>
                        <form onSubmit={this.filterTodos} className="navbar-form navbar-right">
                            <div className="input-group">
                                <div className="checkbox">
                                    <label className="header-label text-info">
                                        <input type="checkbox" defaultChecked={showDoneTodos} onChange={ this.toggleTodos}/> Show done
                                    </label>
                                </div>
                            </div>
                            <div className="input-group">
                                <input type="text" className="form-control"
                                       ref={input => this.textInput = input}
                                       placeholder="Search"
                                       defaultValue={todoFilter}
                                       onChange={this.filterTodos}/>
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={this.clearSearchField}><i className="glyphicon glyphicon-remove"></i></button>
                                </span>
                            </div>
                        </form>
                    </div>
                </nav>
            </header>
        );
    }
}

