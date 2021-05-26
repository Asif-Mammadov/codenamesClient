import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import authService from '../../api/authService';
import { authenticated, showAuthMessages, signOutSuccess } from '../actions';
import { AUTH_TOKEN, SIGNIN, SIGNOUT } from '../constants/Auth';

export function* signIn() {
  yield takeEvery(SIGNIN, function* ({ payload }) {
    try {
      const { response } = yield call(authService.login, payload);
      localStorage.setItem(AUTH_TOKEN, response.token);
      yield put(authenticated(response.id));
    } catch (errors) {
      yield put(showAuthMessages(errors));
    }
  });
}

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
    try {
      yield call(authService.logout);
      localStorage.removeItem(AUTH_TOKEN);
      yield put(clearState());
      yield put(signOutSuccess());
    } catch (errors) {
      yield put(showAuthMessages(errors));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(signIn), fork(signOut)]);
}
