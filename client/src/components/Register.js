import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        email,
        username,
        password
      });
      login(response.data.user, response.data.token);
      navigate('/'); // Navigate to home page after successful registration
    } catch (err) {
      setError(err.response?.data?.message || 'Произошла ошибка');
    }
  };

  return (
    <div className="auth-form">
      <h2>Регистрация</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя пользователя:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p className="auth-link">
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};

export default Register; 