import { all } from 'redux-saga/effects';
import Auth from './Auth';
import App from './App';

export default function* rootSaga(getState) {
  yield all([Auth(), App()]);
}
