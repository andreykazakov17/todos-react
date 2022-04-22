import { ACTIVE_FILTER } from './actionTypes';

const initialState = {
  activeFilter: 'All',
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_FILTER:
      return {
        activeFilter: action.payload,
      };
    default:
      return state;
  }
};

export default filtersReducer;
