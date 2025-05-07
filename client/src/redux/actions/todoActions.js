import axios from 'axios';
import {
  FETCH_TODOS_START,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO
} from '../actionTypes';

const API_URL = 'http://localhost:3001/api/todos';

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  console.log('Using token:', token);
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Fetch todos
export const fetchTodos = () => async (dispatch) => {
  try {
    console.log('Fetching todos...');
    dispatch({ type: FETCH_TODOS_START });
    const response = await axios.get(API_URL, getAuthHeader());
    console.log('Todos fetched:', response.data);
    dispatch({ type: FETCH_TODOS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching todos:', error.response?.data || error.message);
    dispatch({ type: FETCH_TODOS_ERROR, payload: error.message });
  }
};

// Add todo
export const addTodo = (todo) => async (dispatch) => {
  try {
    console.log('Adding todo:', todo);
    const response = await axios.post(API_URL, todo, getAuthHeader());
    console.log('Todo added:', response.data);
    dispatch({ type: ADD_TODO, payload: response.data });
  } catch (error) {
    console.error('Error adding todo:', error.response?.data || error.message);
  }
};

// Edit todo
export const editTodo = (todo) => async (dispatch) => {
  try {
    console.log('Editing todo:', todo);
    const response = await axios.put(`${API_URL}/${todo._id}`, todo, getAuthHeader());
    console.log('Todo edited:', response.data);
    dispatch({ type: EDIT_TODO, payload: response.data });
  } catch (error) {
    console.error('Error editing todo:', error.response?.data || error.message);
  }
};

// Delete todo
export const deleteTodo = (id) => async (dispatch) => {
  try {
    console.log('Deleting todo:', id);
    await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    console.log('Todo deleted successfully');
    dispatch({ type: DELETE_TODO, payload: id });
  } catch (error) {
    console.error('Error deleting todo:', error.response?.data || error.message);
  }
}; 