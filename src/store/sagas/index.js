import { put, call, takeEvery } from '@redux-saga/core/effects';
import {
  fetchGetTodos,
  fetchAddTodo,
  fetchCheckTodo,
  fetchDeleteTodo,
  fetchUpdateTodo,
  fetchClearCompleted,
  fetchToggleAll,
} from './fetchRequests';

// SAGAS

export function* workerLoadTodosSaga() {
  const todosArr = yield call(fetchGetTodos);
  yield put({ type: 'todos/getTodos', payload: todosArr });
}

export function* workerAddTodoSaga(action) {
  const text = yield call(fetchAddTodo, action.payload);
  yield put({ type: 'todos/addTodo', payload: text });
}

export function* workerCheckTodoSaga(action) {
  const checkedTodo = yield call(fetchCheckTodo, action.payload);
  yield put({ type: 'todos/checkTodo', payload: checkedTodo._id });
}

export function* workerDeleteTodoSaga(action) {
  const id = yield call(fetchDeleteTodo, action.payload);
  yield put({ type: 'todos/deleteTodo', payload: id });
}

export function* workerUpdateTodoSaga(action) {
  const request = yield call(fetchUpdateTodo, action.payload);
  yield put({ type: 'todos/updateTodo', payload: request });
}

export function* workerClearCompletedSaga() {
  const idsArr = [];
  const actualArr = yield call(fetchGetTodos);
  for (const todo of actualArr) {
    if (todo.completed) {
      idsArr.push(todo._id);
    }
  }
  const request = yield call(fetchClearCompleted, idsArr);
  yield put({ type: 'todos/clearCompleted', payload: request });
}

export function* workerToggleAllSaga() {
  const request = yield call(fetchToggleAll);
  yield put({ type: 'todos/toggleAllTodos', payload: request });
}

export function* watchSaga() {
  yield takeEvery('LOAD_TODOS', workerLoadTodosSaga);
  yield takeEvery('ADD_TODO', workerAddTodoSaga);
  yield takeEvery('CHECK_TODO', workerCheckTodoSaga);
  yield takeEvery('DELETE_TODO', workerDeleteTodoSaga);
  yield takeEvery('UPDATE_TODO', workerUpdateTodoSaga);
  yield takeEvery('CLEAR_COMPLETED', workerClearCompletedSaga);
  yield takeEvery('TOGGLE_ALL', workerToggleAllSaga);
}

export default function* rootSaga() {
  yield watchSaga();
}
