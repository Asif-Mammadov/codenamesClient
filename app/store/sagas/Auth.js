import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import authService from '../../api/authService';
import {
  authenticated,
  getDetailsSuccess,
  getScoreboardSuccess,
  resetPasswordSuccess,
  showAuthMessage,
  signOutSuccess,
  updateDetailsSuccess
} from '../actions';
import {
  AUTH_TOKEN,
  GET_DETAILS,
  GET_SCOREBOARD,
  RESET_PASSWORD,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  UPDATE_DETAILS,
  USER_ID
} from '../constants/Auth';

export function* signIn() {
  yield takeEvery(SIGNIN, function* ({ payload }) {
    try {
      const response = yield call(authService.login, payload);
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
      const response = yield call(authService.register, payload);
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

export function* getDetails() {
  yield takeEvery(GET_DETAILS, function* () {
    try {
      const response = yield call(
        authService.getDetails,
        localStorage.getItem(USER_ID)
      );
      yield put(getDetailsSuccess(response.data));
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export function* updateDetails() {
  yield takeEvery(UPDATE_DETAILS, function* ({ data }) {
    try {
      const response = yield call(
        authService.updateDetails,
        localStorage.getItem(USER_ID),
        data
      );
      yield put(updateDetailsSuccess(response.message));
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export function* resetPassword() {
  yield takeEvery(RESET_PASSWORD, function* ({ data }) {
    console.log(data);
    try {
      const response = yield call(
        authService.resetPassword,
        localStorage.getItem(USER_ID),
        data
      );
      yield put(resetPasswordSuccess(response.message));
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export function* getScoreboard() {
  yield takeEvery(GET_SCOREBOARD, function* () {
    console.log('test');
    try {
      const { response } = yield call(
        authService.getScoreboard,
        localStorage.getItem(USER_ID)
      );
      yield put(getScoreboardSuccess(response.data));
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(signIn),
    fork(signUp),
    fork(signOut),
    fork(getDetails),
    fork(updateDetails),
    fork(resetPassword),
    fork(getScoreboard)
  ]);
}
