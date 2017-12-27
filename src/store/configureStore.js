import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';
import rootReducer from '../reducers';

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(rootReducer, persistedState, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
  
  //writting to localStorage once in 1s
  store.subscribe(throttle(() => {
    saveState({
        weather: store.getState.weather
    });
  }, 1000));
  return store;
};

export default function configureStore;
