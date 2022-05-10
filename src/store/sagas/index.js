import { put, call, takeEvery, select } from '@redux-saga/core/effects';
import { todosArrSelector } from '../todosSlice';

import {
  fetchGetTodos,
  fetchAddTodo,
  fetchCheckTodo,
  fetchDeleteTodo,
  fetchUpdateTodo,
  fetchClearCompleted,
  fetchToggleAll,
  fetchRegistration,
  fetchLogin,
  fetchLogout,
  fetchRefresh,
  fetchLoadUser,
} from './fetchRequests';

// SAGAS

export function* workerLoadTodosSaga() {
  const response = yield call(fetchGetTodos);
  yield put({ type: 'todos/getTodos', payload: response.data });
}

export function* workerAddTodoSaga(action) {
  console.log(action.payload);
  const response = yield call(fetchAddTodo, action.payload);
  yield put({ type: 'todos/addTodo', payload: response.data });
}

export function* workerCheckTodoSaga(action) {
  const response = yield call(fetchCheckTodo, action.payload);
  yield put({ type: 'todos/checkTodo', payload: response.data.id });
}

export function* workerDeleteTodoSaga(action) {
  const response = yield call(fetchDeleteTodo, action.payload);
  yield put({ type: 'todos/deleteTodo', payload: response.data });
}

export function* workerUpdateTodoSaga(action) {
  const response = yield call(fetchUpdateTodo, action.payload);
  yield put({ type: 'todos/updateTodo', payload: response.data });
}

export function* workerClearCompletedSaga() {
  const idsArr = [];
  const actualArr = yield select(todosArrSelector);
  for (const todo of actualArr) {
    if (todo.completed) {
      idsArr.push(todo.id);
    }
  }
  const response = yield call(fetchClearCompleted, idsArr);
  yield put({ type: 'todos/clearCompleted', payload: response.data });
}

export function* workerToggleAllSaga() {
  const response = yield call(fetchToggleAll);
  yield put({ type: 'todos/toggleAllTodos', payload: response.data });
}

export function* workerRegistrationSaga(action) {
  const response = yield call(fetchRegistration, action.payload);
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  yield put({ type: 'user/registration', payload: response.data });
}

export function* workerLoginSaga(action) {
  const response = yield call(fetchLogin, action.payload);
  console.log(response.data);
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  localStorage.setItem('isAuth', JSON.stringify(response.data.user.isAuth));
  yield put({ type: 'user/login', payload: response.data });
}

export function* workerLogoutSaga(action) {
  console.log(action);
  const response = yield call(fetchLogout);
  console.log(response);
  // console.log(response);
  // console.log(localStorage.getItem('isAuth'));
  // localStorage.clear();
  yield put({ type: 'user/logout' });
}

export function* workerCheckAuthSaga() {
  const response = yield call(fetchRefresh);
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  yield put({ type: 'user/checkAuth', payload: response.data.accessToken });
}

export function* workerLoadUserSaga() {
  const response = yield call(fetchLoadUser);
  console.log(response);
  yield put({ type: 'user/updateStore', payload: response.data });
}

export function* watchSaga() {
  yield takeEvery('LOAD_TODOS', workerLoadTodosSaga);
  yield takeEvery('ADD_TODO', workerAddTodoSaga);
  yield takeEvery('CHECK_TODO', workerCheckTodoSaga);
  yield takeEvery('DELETE_TODO', workerDeleteTodoSaga);
  yield takeEvery('UPDATE_TODO', workerUpdateTodoSaga);
  yield takeEvery('CLEAR_COMPLETED', workerClearCompletedSaga);
  yield takeEvery('TOGGLE_ALL', workerToggleAllSaga);
  yield takeEvery('SIGN_UP', workerRegistrationSaga);
  yield takeEvery('LOG_IN', workerLoginSaga);
  yield takeEvery('LOG_OUT', workerLogoutSaga);
  yield takeEvery('CHECK_AUTH', workerCheckAuthSaga);
  yield takeEvery('LOAD_USER', workerLoadUserSaga);
}

export default function* rootSaga() {
  yield watchSaga();
}
