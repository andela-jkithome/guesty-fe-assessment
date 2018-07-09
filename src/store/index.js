import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from '../reducers';

const middleware = [ReduxThunk];
const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const enhancer = compose(
  applyMiddleware(...middleware),
  devtools,
);

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, enhancer);

  return store;
}
