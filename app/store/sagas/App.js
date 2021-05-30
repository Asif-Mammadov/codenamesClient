import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import appService from '../../api/AppService';
import { showAppMessage, getScoreboardSuccess } from '../actions/App';
import { GET_SCOREBOARD } from '../constants/App';

export function* getScoreboard() {
  yield takeEvery(GET_SCOREBOARD, function* ({ id }) {
    try {
      const { response } = yield call(appService.getScoreboard, id);
      yield put(getScoreboardSuccess(response));
    } catch (error) {
      yield put(showAppMessage(error));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getScoreboard)]);
}
