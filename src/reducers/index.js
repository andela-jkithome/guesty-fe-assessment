import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import user from './user';
import repos from './repos';

export default combineReducers({
  routing,
  user,
  repos,
});
