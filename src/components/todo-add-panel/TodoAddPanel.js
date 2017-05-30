import React, {PureComponent} from 'react';
import './TodoAddPanel.css';

export class TodoAddPanel extends PureComponent {

    addValue = (e) => {
        e.preventDefault();
        if(this.textInput.value) {
            this.props.onAddValue({value: this.textInput.value, category: this.props.selectedCategory});
        }
    };

    render() {
        const {placeholder} = this.props;

        return (
            <form onSubmit={this.addValue}
                  className="todo-add-panel">
                <div className="input-group">
                    <input ref={input => this.textInput = input}
                           type="text" className="form-control"
                           placeholder={placeholder}/>
                    <span className="input-group-btn">
                        <button className="btn btn-default"
                                type="submit"
                                onClick={this.addValue}>Add</button>
                    </span>
                </div>
            </form>
        );
    }
}

