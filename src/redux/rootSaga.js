import { all } from 'redux-saga/effects';
import * as actSaga from './actionSaga/UserLogin'

function* rootSaga() {
  yield all([
    actSaga.signInRequest()
  ])
}
export default rootSaga;