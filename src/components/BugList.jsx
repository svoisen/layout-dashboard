import './BugList.css';
import React from 'react';
import { observer } from 'mobx-react';

const renderBug = bug => {
  return (
    <tr key={ bug.id } className={ bug.is_open ? "openBug" : "closedBug" }>
      <td className="bugId"><a href={ `https://bugzilla.mozilla.org/show_bug.cgi?id=${bug.id}` }>{ bug.id }</a></td>
      <td className="bugComponent">{ bug.component }</td>
      <td className="bugSummary">{ bug.summary }</td>
      <td className="bugDate">{ bug.creation_time }</td>
      <td className="bugDate">{ bug.last_change_time }</td>
    </tr>
  )
}

const BugList = observer(({ bugs }) => {
  return (
    <div className="buglist">
      <table>
        <thead>
          <tr>
            <th>Bug</th>
            <th>Component</th>
            <th>Summary</th>
            <th>Created On</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          { bugs.map(renderBug) }
        </tbody>
      </table>
    </div>
  );
});

export default BugList;