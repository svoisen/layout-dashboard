import { QUANTUM_FLOW, WEBCOMPAT } from '../constants/BugListTypes';

const config = require('../config.json');

const fetchBugs = ({ bugs, listType }) => {
  const url = new URL(config.bugzilla.endpoint);
  url.searchParams.append('include_fields', ['id', 'summary', 'component', 'is_open', 'creation_time', 'last_change_time'].join(','));

  config.bugzilla.layoutComponents.forEach(component => {
    url.searchParams.append('component', component);
  });

  if (listType === QUANTUM_FLOW) {
    url.searchParams.append('whiteboard', '[qf:p1:f64]');
  } else if (listType === WEBCOMPAT) {
    url.searchParams.append('whiteboard', '[webcompat:p1]');
  }

  window.fetch(url)
    .then(checkResponse)
    .then(parseJSON)
    .then(data => {
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