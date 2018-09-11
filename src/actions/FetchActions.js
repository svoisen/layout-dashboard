import { QUANTUM_FLOW, WEBCOMPAT } from '../constants/BugListTypes';

const config = require('../config.json');

const fetchBugs = ({ bugs, listType }) => {
  const url = new URL(config.bugzilla.endpoint);
  url.searchParams.append('include_fields', ['id', 'summary', 'component', 'is_open', 'creation_time', 'last_change_time', 'cf_last_resolved'].join(','));
  config.bugzilla.layoutComponents.forEach(component => url.searchParams.append('component', component));
  ['FIXED', '---'].forEach(resolution => url.searchParams.append('resolution', resolution));
  ['NEW', 'ASSIGNED', 'REOPENED', 'RESOLVED', 'VERIFIED', 'CLOSED'].forEach(status => url.searchParams.append('bug_status', status));

  if (listType === QUANTUM_FLOW) {
    url.searchParams.append('whiteboard', '[qf:p1:f64]');
  } else if (listType === WEBCOMPAT) {
    url.searchParams.append('whiteboard', '[webcompat:p1]');
  }

  window.fetch(url)
    .then(checkResponse)
    .then(parseJSON)
    .then(data => {
      data.bugs.sort((a, b) => a.creation_time < b.creation_time);
      bugs.replace(data.bugs);
    })
    .catch(error => {
      console.log(error);
    });
}

const parseJSON = response => {
  return response.json();
}

const checkResponse = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  return error;
}

export {
  fetchBugs
}