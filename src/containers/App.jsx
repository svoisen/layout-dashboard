import './App.css';
import React from 'react';
import Header from './Header';
import BugList from '../components/BugList';
import { observer } from 'mobx-react';
import BurndownChartView from '../components/BurndownChartView';

const App = observer(({ store }) => {
  return (
    <div id="app" className="app">
      <Header router={ store.router } />
      <div className="contents">
        <BurndownChartView bugs={ store.bugs } />
        <BugList bugs={ store.bugs } />
      </div>
    </div>
  );
});

export default App;