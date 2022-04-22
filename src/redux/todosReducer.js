import {
  ADD_TODO,
  CHECK_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  CLEAR_COMPLETED,
  TOGGLE_ALL_TODOS,
} from './actionTypes';

const initialState = {
  todosArr: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { todosArr: [...state.todosArr, action.payload] };
    case CHECK_TODO:
      return {
        todosArr: state.todosArr.map((item) =>
          item.id === action.payload ? { ...item, completed: !item.completed } : item,
        ),
      };
    case DELETE_TODO:
      return {
        todosArr: state.todosArr.filter((todo) => todo.id !== action.payload),
      };
    case UPDATE_TODO:
      return {
        todosArr: state.todosArr.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, text: action.payload.value };
          }
          return item;
        }),
      };
    case CLEAR_COMPLETED:
      return {
        todosArr: state.todosArr.filter((item) => !item.completed),
      };
    case TOGGLE_ALL_TODOS:
      if (state.todosArr.every((item) => item.completed)) {
        return {
          todosArr: state.todosArr.map((item) => ({ ...item, completed: false })),
        };
      }

      if (
        state.todosArr.every((item) => !item.completed) ||
        state.todosArr.some((item) => item.completed)
      ) {
        return {
          todosArr: state.todosArr.map((item) => ({ ...item, completed: true })),
        };
      }
      break;
    default:
      return state;
  }
};

export default todosReducer;
