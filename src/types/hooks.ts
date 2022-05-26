import {
  TypedUseSelectorHook,
  useSelector as _useSelector,
  useDispatch as _useDispatch,
} from 'react-redux';
import { StoreUserActions, StoreTodosActions } from './actions';
import { IRootState } from '../store/storeTypes/state';

type StoreActions = StoreUserActions | StoreTodosActions;

export const useDispatch = () => {
  const dispatch = _useDispatch();
  return (event: StoreActions) => {
    dispatch(event);
  };
};

export const useSelector: TypedUseSelectorHook<IRootState> = _useSelector;
