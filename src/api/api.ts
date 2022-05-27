import axios, { AxiosError } from 'axios';
import { logout } from '../store/userSlice';
import store from '../store/index';
import { IUpdateTodoRecord, IUserRecord } from 'types/record';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (config.headers === undefined) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:5001/refresh',
          withCredentials: true,
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {
        if (e instanceof AxiosError && e?.response?.status === 401) {
          await axios({
            method: 'POST',
            url: 'http://localhost:5001/logout',
            withCredentials: true,
          }).then((res) => {
            localStorage.clear();
            store.dispatch(logout());
          });
        }
      }
    }
    throw error;
  },
);

export const fetchRegistration = (payload: IUserRecord) =>
  api({ method: 'POST', url: '/registration', data: payload });
export const fetchLogin = (payload: IUserRecord) =>
  api({ method: 'POST', url: '/login', data: payload });
export const fetchRefresh = () => api({ method: 'GET', url: '/refresh' });
export const fetchLogout = () => api({ method: 'POST', url: '/logout' });
export const fetchLoadUser = async (payload: string) =>
  api({ method: 'POST', url: '/user', data: payload });

export const fetchGetTodos = async () => api({ method: 'GET', url: '/todos' });
export const fetchAddTodo = async (text: string) =>
  api({ method: 'POST', url: '/todos', data: text });
export const fetchCheckTodo = async (id: string) =>
  api({ method: 'PATCH', url: `/todos/${id}`, data: id });
export const fetchDeleteTodo = async (id: string) =>
  api({ method: 'DELETE', url: `/todos/${id}`, data: id });
export const fetchUpdateTodo = async ({ id, value }: IUpdateTodoRecord) =>
  api({ method: 'POST', url: `/todos/${id}`, data: { id, value } });
export const fetchClearCompleted = async (action: Array<string>) =>
  api({ method: 'POST', url: `/todos/clearAll`, data: action });

export const fetchToggleAll = async () => api({ method: 'PATCH', url: '/todos' });
