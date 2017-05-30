import React, { Component } from 'react';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';

import './App.css';
import { LayoutMain } from './layouts/layout-main';
import { LayoutEdit } from './layouts/layout-edit';

const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
  render() {
      return (
      <Provider store={store}>
          <div className="body-container">
              <Router history={history}>
                  <Route path="/" component={LayoutMain}/>
                  <Route path="/edit" component={LayoutEdit}/>
                  <Redirect from='*' to="/" />
              </Router>
          </div>
      </Provider>
    );
  }
}

export default App;
