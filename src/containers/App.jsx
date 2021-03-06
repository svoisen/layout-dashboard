import './App.css';
import React from 'react';
import Header from './Header';
import BugList from '../components/BugList';
import { observer } from 'mobx-react';
import BurndownChartView from '../components/BurndownChartView';
import FilterOptionsView from '../components/FilterOptionsView';
import { createFilterActions } from '../actions/FilterActions';


const App = observer(({ store }) => {
  const { setStartDateFromStr } = createFilterActions(store);
  const { bugs, filterOptions, router } = store;

  return (
    <div id="app" className="app">
      <Header router={ router } />
      <div className="contents">
        <FilterOptionsView
          filterOptions={ filterOptions }
          onStartDateChange={ dateStr => setStartDateFromStr(dateStr) } />
        <BurndownChartView
          bugs={ bugs }
          filterOptions={ filterOptions } />
        <BugList bugs={ bugs } />
      </div>
    </div>
  );
});

export default App;