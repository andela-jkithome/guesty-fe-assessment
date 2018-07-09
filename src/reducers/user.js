const user = (
  state = {
    fetching: false,
    user: {},
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case 'USER_REQUEST':
      return Object.assign({}, state, { user: {}, fetching: true });
    case 'USER_SUCCESS':
      return Object.assign({}, state, { fetching: false, user: action.user });
    case 'USER_FAILURE':
      return Object.assign({}, state, {
        fetching: false,
        error: action.failure,
      });
    default:
      return state;
  }
};

export default user;
