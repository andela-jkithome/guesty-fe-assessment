const repos = (
  state = {
    fetching: false,
    repos: [],
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case 'REPOS_REQUEST':
      return Object.assign({}, state, { fetching: true, error: null });
    case 'REPOS_SUCCESS':
      return Object.assign({}, state, {
        fetching: false,
        categories: action.repos,
      });
    case 'REPOS_FAILURE':
      return Object.assign({}, state, {
        fetching: false,
        error: action.failure,
      });
    default:
      return state;
  }
};

export default repos;
