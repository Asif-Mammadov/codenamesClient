import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import authService from '../../api/authService';
import { authenticated, showAuthMessage, signOutSuccess } from '../actions';
import {
  AUTH_TOKEN,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  USER_ID
} from '../constants/Auth';

export function* signIn() {
  yield takeEvery(SIGNIN, function* ({ payload }) {
    try {
      const { response } = yield call(authService.login, payload);
      localStorage.setItem(AUTH_TOKEN, response.token);
      localStorage.setItem(USER_ID, response.userID);
      yield put(authenticated(response.token, response.userID));
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export function* signUp() {
  yield takeEvery(SIGNUP, function* ({ payload }) {
    try {
      const { response } = yield call(authService.register, payload);
      localStorage.setItem(AUTH_TOKEN, response.token);
      yield put(authenticated(response.token));
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
    localStorage.removeItem(AUTH_TOKEN);
    yield put(signOutSuccess());
  });
}

export default function* rootSaga() {
  yield all([fork(signIn), fork(signUp), fork(signOut)]);
}
