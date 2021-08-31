import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* SetTokenId() {
  //yield console.log("join saga");
  try {
    const _token = yield select(state => state._changeState._token);
    const id_user = yield select(state => state._changeState.id_user);
    yield AsyncStorage.multiSet([
      [
        'acount',
        JSON.stringify({
          id: id_user,
          token: _token,
        }),
      ],
      [
        'cart',
        JSON.stringify({
          number: '12',
          store: [
            {
              id: 1,
              name: 'ao',
              number: '123',
            },
            {
              id: 2,
              name: 'quan',
              number: '234',
            },
          ],
        }),
      ],
    ]);
  } catch (error) {
    console.log(error);
  }
}
export function* RemoveTokenId() {
  try {
    yield AsyncStorage.multiRemove(['acount', 'cart']);
  } catch (e) {
    console.log(e);
  }
}
export function* LoadTokenId() {
  try {
    const acount = yield AsyncStorage.getItem('acount');
    if (acount !== null) {
      console.log(acount);
      let acount_ = JSON.parse(acount);
      yield put({
        type: 'SET_TOKEN_ID',
        payload: {_token: acount_.token, id_user: acount_.id},
      });
    }
  } catch (e) {
    console.log(e);
  }
}
import localhost from '../api/localhost';
export function* LoadPerson() {
  try {
    const _token = yield select(state => state._changeState._token);
    const id_user = yield select(state => state._changeState.id_user);

    const data = yield fetch(localhost + 'api/acount_admin/show_acount', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_user: id_user,
        token: _token,
      }),
    })
      .then(response => response.json())
      .then(result => {
        return result.data;
      })
      .catch(err => console.log(err));
    if (data) {
      yield put({
        type: 'SET_PERSON',
        payload: {data: data},
      });
    }
  } catch (e) {
    console.log(e);
  }
}
export function* watcherAuthen() {
  yield takeEvery('SET_TOKEN_ID', SetTokenId);
  yield takeEvery('REMOVE_TOKEN_ID', RemoveTokenId);
  yield takeEvery('LOAD_TOKEN_ID', LoadTokenId);
  yield takeEvery('LOAD_PERSON', LoadPerson);
}
