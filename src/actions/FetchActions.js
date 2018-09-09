import { QUANTUM_FLOW, WEBCOMPAT } from '../constants/BugListTypes';

const config = require('../config.json');

const fetchBugs = ({ bugs, listType }) => {
  const url = new URL(config.bugzilla.endpoint);
  const params = {
    include_fields: ['id', 'summary', 'is_open', 'creation_time', 'last_change_time'].join(','),
    component: config.bugzilla.layoutComponents.join(',')
  };

  if (listType === QUANTUM_FLOW) {
    params.whiteboard = '[qf:p1:f64]';
  } else if (listType === WEBCOMPAT) {
    params.whiteboard = '[webcompat:p1]';
  }

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

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