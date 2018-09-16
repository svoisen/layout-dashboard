import '../node_modules/c3/c3.css'
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { createFetchActions } from './actions/FetchActions';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'mobx-react-router';
import { autorun } from 'mobx';
import { QUANTUM_FLOW, WEBCOMPAT } from './constants/BugListTypes';
import App from './containers/App';
import { createStore } from './stores/Store';
import { createFilterActions } from './actions/FilterActions';

const browserHistory = createBrowserHistory();
const store = createStore();
const history = syncHistoryWithStore(browserHistory, store.router);
const { fetchBugs } = createFetchActions(store);
const { applyFilters } = createFilterActions(store);

const initialize = () => {
  ReactDOM.render(
    <Router history={ history }>
      <App store={ store } />
    </Router>,
    document.getElementById('container')
  );
}

autorun(() => {
  const location = store.router.location;
  const unprefixedHash = location.hash.length > 0 ? location.hash.substring(1) : undefined;
  if (unprefixedHash === QUANTUM_FLOW || !unprefixedHash) {
    fetchBugs({ listType: QUANTUM_FLOW });
  } else if (unprefixedHash === WEBCOMPAT) {
    fetchBugs({ listType: WEBCOMPAT })
  }
});

store.bugs.observe(() => {
  applyFilters();
}, true);

initialize();