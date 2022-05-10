import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/todos',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  console.log('config', config);
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('response', response);
    return response;
  },
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios({ method: 'GET', url: 'http://localhost:5001/todos/refresh' });
        console.log('response.get', response);
        localStorage.setItem('token', response.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {
        console.log('Not authorized');
      }
    }
    throw error;
  },
);

export const fetchRegistration = (payload) =>
  api({ method: 'POST', url: 'registration', data: payload });

export const fetchLogin = (payload) => api({ method: 'POST', url: '/login', data: payload });
export const fetchLogout = () => api({ method: 'POST', url: '/logout' });
export const fetchRefresh = () => api({ method: 'GET', url: '/refresh' });
export const fetchGetTodos = async () => api({ method: 'GET' });
export const fetchAddTodo = async (text) => api({ method: 'POST', data: text });
export const fetchCheckTodo = async (id) => api({ method: 'PATCH', url: `/${id}`, data: id });
export const fetchDeleteTodo = async (id) => api({ method: 'DELETE', url: `/${id}`, data: id });
export const fetchUpdateTodo = async ({ id, value }) =>
  api({ method: 'POST', url: `/${id}`, data: { id, value } });
export const fetchClearCompleted = async (action) =>
  api({ method: 'POST', url: `/clearAll`, data: action });
export const fetchToggleAll = async () => api({ method: 'PATCH' });
export const fetchLoadUser = async () => api({ method: 'GET', url: '/user' });
