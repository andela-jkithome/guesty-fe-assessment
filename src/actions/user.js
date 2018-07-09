import fetch from 'isomorphic-fetch';

export const fetchRequest = () => ({
  type: 'USER_REQUEST',
});

export const fetchSuccess = user => ({
  type: 'USER_SUCCESS',
  user,
});

export const fetchFailure = failure => ({
  type: 'USER_FAILURE',
  failure,
});

export const fetchCategories = url => dispatch => {
  dispatch(fetchRequest());
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return response.json().then(Promise.reject.bind(Promise));
      }
      return response.json();
    })
    .then(json => dispatch(fetchSuccess(json)))
    .catch(() => dispatch(fetchFailure('Error Finding User!')));
};
