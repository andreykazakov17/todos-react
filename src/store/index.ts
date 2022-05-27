import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import todoReducer from './todosSlice';
import filterReducer from './filterSlice';
import userReducer from './userSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    todos: todoReducer,
    filter: filterReducer,
    user: userReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
