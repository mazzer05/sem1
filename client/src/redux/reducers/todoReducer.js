import {
  FETCH_TODOS_START,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO
} from '../actionTypes';

const initialState = {
  todos: [],
  loading: false,
  error: null
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TODOS_SUCCESS:
      console.log('Todos received:', action.payload);
      return {
        ...state,
        loading: false,
        todos: action.payload,
        error: null
      };
    case FETCH_TODOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_TODO:
      console.log('Adding todo:', action.payload);
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case EDIT_TODO:
      console.log('Editing todo:', action.payload);
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo._id === action.payload._id ? action.payload : todo
        )
      };
    case DELETE_TODO:
      console.log('Deleting todo:', action.payload);
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload)
      };
    default:
      return state;
  }
};

export default todoReducer; 