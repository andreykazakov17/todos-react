import axios from 'axios';

const callApi = async (config) => {
  const request = await axios({
    method: config.method,
    url: `http://localhost:5001${config.url}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: config.data,
  });
  return request.data;
};

export const fetchGetTodos = async () => await callApi({ method: 'GET', url: '/todos' });
export const fetchAddTodo = async (text) =>
  await callApi({ method: 'POST', url: '/todos', data: text });

export const fetchCheckTodo = async (id) =>
  await callApi({ method: 'PATCH', url: `/todos/${id}`, data: id });

export const fetchDeleteTodo = async (id) =>
  await callApi({ method: 'DELETE', url: `/todos/${id}`, data: id });

export const fetchUpdateTodo = async ({ id, value }) =>
  await callApi({ method: 'POST', url: `/todos/${id}`, data: { id, value } });

export const fetchClearCompleted = async (action) =>
  await callApi({ method: 'POST', url: `/todos/clearAll`, data: action });

export const fetchToggleAll = async () => await callApi({ method: 'PATCH', url: `/todos` });
