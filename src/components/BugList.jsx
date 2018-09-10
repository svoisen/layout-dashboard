import './BugList.css';
import React from 'react';
import { observer } from 'mobx-react';

const renderBug = bug => {
  return (
    <tr key={ bug.id }>
      <td>{ bug.id }</td>
      <td>{ bug.component }</td>
      <td>{ bug.summary }</td>
    </tr>
  )
}

const BugList = observer(({ bugs }) => {
  return (
    <table className="buglist">
      <thead>
        <tr>
          <td>Bug</td>
          <td>Component</td>
          <td>Summary</td>
        </tr>
      </thead>
      <tbody>
        { bugs.map(renderBug) }
      </tbody>
    </table>
  );
});

export default BugList;