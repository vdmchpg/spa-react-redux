import React, { PureComponent } from 'react';
import './TodoProgressBar.css';

export class TodoProgressBar extends PureComponent {
    render() {
        const { progress } = this.props;

        return (
            <div className="progress">
              <div className="progress-bar" style={{
                  width: `${progress}%`
              }}></div>
            </div>
        );
    }
}

