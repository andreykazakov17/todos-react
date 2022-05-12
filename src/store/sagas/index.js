import { put, call, takeEvery, select } from '@redux-saga/core/effects';
import {
  getTodos,
  todosArrSelector,
  addTodo,
  checkTodo,
  deleteTodo,
  updateTodo,
  clearCompleted,
  toggleAllTodos,
} from '../todosSlice';

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
  fetchRefresh,
  fetchLoadUser,
} from './fetchRequests';

import { registration, login, checkAuth, updateStore } from '../userSlice';

// SAGAS

export function* workerLoadTodosSaga(action) {
  const response = yield call(fetchGetTodos, action.payload);
  yield put(getTodos(response.data));
}

export function* workerAddTodoSaga(action) {
  const response = yield call(fetchAddTodo, action.payload);
  yield put(addTodo(response.data));
}

export function* workerCheckTodoSaga(action) {
  const response = yield call(fetchCheckTodo, action.payload);
  yield put(checkTodo(response.data.id));
}

export function* workerDeleteTodoSaga(action) {
  const response = yield call(fetchDeleteTodo, action.payload);
  yield put(deleteTodo(response.data));
}

export function* workerUpdateTodoSaga(action) {
  const response = yield call(fetchUpdateTodo, action.payload);
  yield put(updateTodo(response.data));
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
  yield put(clearCompleted(response.data));
}

export function* workerToggleAllSaga() {
  const response = yield call(fetchToggleAll);
  yield put(toggleAllTodos(response.data));
}

export function* workerRegistrationSaga(action) {
  const response = yield call(fetchRegistration, action.payload);
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  yield put(registration(response.data));
}

export function* workerLoginSaga(action) {
  const response = yield call(fetchLogin, action.payload);
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  localStorage.setItem('userId', JSON.stringify(response.data.user.id));
  yield put(login(response.data));
}

export function* workerCheckAuthSaga() {
  const response = yield call(fetchRefresh);
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  yield put(checkAuth(response.data.accessToken));
}

export function* workerLoadUserSaga(action) {
  const response = yield call(fetchLoadUser, action.payload);
  yield put(updateStore(response.data));
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
  yield takeEvery('CHECK_AUTH', workerCheckAuthSaga);
  yield takeEvery('LOAD_USER', workerLoadUserSaga);
}

export default function* rootSaga() {
  yield watchSaga();
}
