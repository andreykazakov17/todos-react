import axios from 'axios';

export async function fetchGetTodos() {
  const request = await axios.get('http://localhost:5001/todos');
  return request.data;
}

export async function fetchAddTodo(text) {
  const request = await axios.post('http://localhost:5001/todos', text);
  return request.data;
}

export async function fetchCheckTodo(id) {
  const request = await axios.patch(`http://localhost:5001/todos/${id}`, id);
  return request.data;
}

export async function fetchDeleteTodo(id) {
  const request = await axios.delete(`http://localhost:5001/todos/${id}`, id);
  return request.data;
}

export async function fetchUpdateTodo({ id, value }) {
  const request = await axios.post(`http://localhost:5001/todos/${id}`, { id, value });
  return request.data;
}

export async function fetchClearCompleted(action) {
  const request = await axios.post(`http://localhost:5001/todos/clearAll`, action);
  return request.data;
}

export async function fetchToggleAll() {
  const request = await axios.patch('http://localhost:5001/todos');
  return request.data;
}
