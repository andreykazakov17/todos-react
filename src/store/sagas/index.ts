import { put, call as _call, takeEvery, select } from '@redux-saga/core/effects';
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
import { ITodo } from 'types/todo';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { StoreTodosActions } from 'types/actions';
import { IUpdateTodoRecord, IUserRecord } from 'types/record';
import { IUser } from 'types/user';
import { IAuthorization } from 'types/authorization';

const error = (e: any) => new Error(e);
const call: any = _call;

interface ISagaAction<T> {
  type: StoreTodosActions;
  payload?: T;
}

interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export function* workerLoadTodosSaga() {
  try {
    const response: AxiosResponse<ITodo[]> = yield call(fetchGetTodos);
    yield put(getTodos(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerAddTodoSaga(action: ISagaAction<string>) {
  try {
    const response: AxiosResponse<ITodo> = yield call(fetchAddTodo, action.payload);
    yield put(addTodo(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerCheckTodoSaga(action: ISagaAction<string>) {
  try {
    const response: AxiosResponse<ITodo> = yield call(fetchCheckTodo, action.payload);
    yield put(checkTodo(response.data.id));
  } catch (e) {
    error(e);
  }
}

export function* workerDeleteTodoSaga(action: ISagaAction<string>) {
  try {
    const response: AxiosResponse<string> = yield call(fetchDeleteTodo, action.payload);
    yield put(deleteTodo(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerUpdateTodoSaga(action: ISagaAction<IUpdateTodoRecord>) {
  try {
    const response: AxiosResponse<ITodo> = yield call(fetchUpdateTodo, action.payload);
    yield put(updateTodo(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerClearCompletedSaga() {
  try {
    const idsArr: Array<string> = [];
    const actualArr: ITodo[] = yield select(todosArrSelector);
    for (const todo of actualArr) {
      if (todo.completed) {
        idsArr.push(todo.id);
      }
    }
    const response: AxiosResponse<ITodo[]> = yield call(fetchClearCompleted, idsArr);
    yield put(clearCompleted(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerToggleAllSaga() {
  try {
    const response: AxiosResponse<ITodo[]> = yield call(fetchToggleAll);
    yield put(toggleAllTodos(response.data));
  } catch (e) {
    error(e);
  }
}

export function* workerRegistrationSaga(action: ISagaAction<IUserRecord>) {
  try {
    const response: AxiosResponse<IAuthorization> = yield call(fetchRegistration, action.payload);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('userId', JSON.stringify(response.data.user.id));
    const user: IUser = response.data.user;
    yield put(registration(user));
  } catch (e) {
    error(e);
  }
}

export function* workerLoginSaga(action: ISagaAction<IUserRecord>) {
  try {
    const response: AxiosResponse<IAuthorization> = yield call(fetchLogin, action.payload);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('userId', JSON.stringify(response.data.user.id));
    const user: IUser = response.data.user;
    yield put(setUser(user));
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

export function* workerLoadUserSaga() {
  try {
    const response: AxiosResponse<IUser> = yield call(
      fetchLoadUser,
      localStorage.getItem('userId'),
    );
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
  yield takeEvery('LOAD_USER', workerLoadUserSaga);
}

export default function* rootSaga() {
  yield watchSaga();
}
