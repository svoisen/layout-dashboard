import '../node_modules/c3/c3.css'
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { RouterStore } from 'mobx-react-router';
import { fetchBugs } from './actions/FetchActions';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'mobx-react-router';
import { autorun, observable } from 'mobx';
import { QUANTUM_FLOW, WEBCOMPAT } from './constants/BugListTypes';
import App from './containers/App';

const browserHistory = createBrowserHistory();
const routerStore = new RouterStore();

const store = {
  bugs: observable([]),
  router: routerStore
};

const history = syncHistoryWithStore(browserHistory, routerStore);

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
    fetchBugs({ bugs: store.bugs, listType: QUANTUM_FLOW });
  } else if (unprefixedHash === WEBCOMPAT) {
    fetchBugs({ bugs: store.bugs, listType: WEBCOMPAT })
  }
});

initialize();