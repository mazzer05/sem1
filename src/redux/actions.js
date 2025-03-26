export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const FETCH_TODOS = 'FETCH_TODOS';

const API_URL = 'http://localhost:3001/todos';

export const fetchTodos = () => async (dispatch) => {
  const response = await fetch('http://localhost:3001/todos');
  const todos = await response.json();
  dispatch({ type: FETCH_TODOS, payload: todos });
};

export const addTodo = (todo) => async (dispatch) => {
  const response = await fetch('http://localhost:3001/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await response.json();
  dispatch({ type: ADD_TODO, payload: newTodo });
};

export const editTodo = (todo) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await response.json();
  dispatch({ type: EDIT_TODO, payload: updatedTodo });
};

export const deleteTodo = (id) => async (dispatch) => {
  await fetch(`http://localhost:3001/todos/${id}`, {
    method: 'DELETE',
  });
  dispatch({ type: DELETE_TODO, payload: id });
};