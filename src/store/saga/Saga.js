import { call, put, takeLatest, select } from "redux-saga/effects";
import * as actions from "../action/Action";
import { getData } from "../../serviceWorker/ServiceWorker";
import { BATCH_SIZE, MAX_CATALOGUE_LENGTH } from "../../Constants";

function* fetchUsersSaga() {
  yield takeLatest(
    [actions.GET_USERS, actions.GET_NEXT_USERS_BATCH],
    function* ({ type }) {
      try {
        const { currentPage, isEndOfCatalogue } = yield select(
          (state) => state.users
        );

        if (isEndOfCatalogue) {
          const itemsReminder = MAX_CATALOGUE_LENGTH % BATCH_SIZE;
          if (itemsReminder === 0) {
            return;
          }

          const users = yield call(
            getData,
            `https://randomuser.me/api/?page=${currentPage}&results=${itemsReminder}`
          );

          yield put(actions.getUsersSuccess(users));
        }

        const users = yield call(
          getData,
          `https://randomuser.me/api/?page=${currentPage}&results=${BATCH_SIZE}`
        );
        
        if(type === actions.GET_USERS) {
            yield put(actions.getUsersSuccess(users))
        } else {
            yield put(actions.getNextUsersBatchSuccess(users));
        }

        if (type === actions.GET_USERS) {
          yield put(actions.getNextUsersBatch());
        }
      } catch (error) {
        if (type === actions.GET_USERS) {
          yield put(actions.getUsersFailure());
        } else {
          yield put(actions.getNextUsersBatchFailure());
        }
      }
    }
  );
}

export default fetchUsersSaga;
