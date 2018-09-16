import './FilterOptionsView.css';
import React from 'react';
import { observer } from 'mobx-react';
import { formatDateForInput } from '../util/DateUtil';

const FilterOptionsView = ({ filterOptions, onStartDateChange }) => {
  return (
    <div className="filterOptionsView">
      <div className="filterOptionsFieldGroup">
        <label htmlFor="startDate">Start Date</label>
        <input type="date" name="startDate" value={ formatDateForInput(filterOptions.startDate.get()) } onChange={ e => onStartDateChange(e.target.value) } />
      </div>
    </div>
  );
}

export default observer(FilterOptionsView);