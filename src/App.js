import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import Home from './components/home';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);
export default App;
