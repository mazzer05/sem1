import axios from 'axios';
import { LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from './types';

export const register = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/register', userData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    throw err;
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', credentials, { withCredentials: true });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    throw err;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });
    dispatch({ type: LOGOUT });
  } catch (err) {
    console.error('Logout error:', err);
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth/user', { withCredentials: true });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.error('Load user error:', err);
  }
};