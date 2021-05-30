import { combineReducers } from 'redux';
import Auth from './Auth';
import App from './App';

const reducers = combineReducers({
  auth: Auth,
  app: App
});

export default reducers;
