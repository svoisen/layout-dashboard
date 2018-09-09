import React from 'react';
import Header from './Header';
import BugList from '../components/BugList';
import { observer } from 'mobx-react';

const App = observer(({ store }) => {
  return (
    <div id="app" className="app">
      <Header router={ store.router } />
      <div className="contents">
        <BugList bugs={ store.bugs } />
      </div>
    </div>
  );
});

export default App;