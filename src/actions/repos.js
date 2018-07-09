import fetch from 'isomorphic-fetch';

export const fetchRequest = () => ({
  type: 'REPOS_REQUEST',
});

export const fetchSuccess = repos => ({
  type: 'REPOS_SUCCESS',
  repos,
});

export const fetchFailure = failure => ({
  type: 'REPOS_FAILURE',
  failure,
});

export const fetchFact = url => dispatch => {
  dispatch(fetchRequest());
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return response.json().then(Promise.reject.bind(Promise));
      }
      return response.json();
    })
    .then(json => dispatch(fetchSuccess(json)))
    .catch(() => dispatch(fetchFailure('Error Fetching Repositories!')));
};
