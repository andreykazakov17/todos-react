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
  fetchLogout,
} from '../../api/api';

import { registration, setUser, logout } from '../userSlice';

const error = (e) => new Error(e);

export function* workerLoadTodosSaga() {
  try {
    const response = yield call(fetchGetTodos);
    yield put(getTodos(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerAddTodoSaga(action) {
  try {
    const response = yield call(fetchAddTodo, action.payload);
    yield put(addTodo(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerCheckTodoSaga(action) {
  try {
    const response = yield call(fetchCheckTodo, action.payload);
    yield put(checkTodo(response.data.id));
  } catch (e) {
    error(e);
  }
}

export function* workerDeleteTodoSaga(action) {
  try {
    const response = yield call(fetchDeleteTodo, action.payload);
    yield put(deleteTodo(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerUpdateTodoSaga(action) {
  try {
    const response = yield call(fetchUpdateTodo, action.payload);
    yield put(updateTodo(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerClearCompletedSaga() {
  try {
    const idsArr = [];
    const actualArr = yield select(todosArrSelector);
    for (const todo of actualArr) {
      if (todo.completed) {
        idsArr.push(todo.id);
      }
    }
    const response = yield call(fetchClearCompleted, idsArr);
    yield put(clearCompleted(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerToggleAllSaga() {
  try {
    const response = yield call(fetchToggleAll);
    yield put(toggleAllTodos(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerRegistrationSaga(action) {
  try {
    const response = yield call(fetchRegistration, action.payload);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('userId', JSON.stringify(response.data.user.id));
    yield put(registration(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerLoginSaga(action) {
  try {
    const response = yield call(fetchLogin, action.payload);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('userId', JSON.stringify(response.data.user.id));
    yield put(setUser(response.data.user));
  } catch (e) {
    error(e);
  }
}

export function* workerLogoutSaga() {
  try {
    yield call(fetchLogout);
    localStorage.clear();
    yield put(logout());
  } catch (e) {
    error(e);
  }
}

export function* workerCheckAuthSaga() {
  try {
    const response = yield call(fetchRefresh);
    localStorage.setItem('accessToken', response.data.accessToken);
    yield put(setUser(response.data.user));
  } catch (e) {
    error(e);
  }
}

export function* workerLoadUserSaga() {
  try {
    const response = yield call(fetchLoadUser, localStorage.getItem('userId'));
    yield put(setUser(response.data));
  } catch (e) {
    error(e);
  }
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
