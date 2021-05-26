import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useMemo } from 'react';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const isBrowser = typeof window !== undefined;

let store;

function initStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (!isBrowser) return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
