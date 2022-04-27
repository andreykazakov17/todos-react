import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import todoReducer from './todosSlice';
import filterReducer from './filterSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    todos: todoReducer,
    filter: filterReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
