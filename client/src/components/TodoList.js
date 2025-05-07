import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchTodos, addTodo, editTodo, deleteTodo } from '../redux/actions';
import TodoItem from './TodoItem';

const TodoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { todos, loading, error } = useSelector((state) => state.todos);
  
  // Form states
  const [newTodoText, setNewTodoText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('в процессе');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState([]);
  const [enableReminder, setEnableReminder] = useState(false);

  // Load todos on mount
  useEffect(() => {
    console.log('Fetching todos...');
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Add todo handler
  const handleAdd = () => {
    if (!newTodoText.trim()) return;
    
    const newTodo = {
      text: newTodoText,
      status: selectedStatus,
      dueDate,
      reminder: enableReminder,
      tags: tags.filter(tag => tag.trim() !== ''),
      completed: false
    };
    
    dispatch(addTodo(newTodo));
    resetForm();
  };

  // Edit todo handler
  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setNewTodoText(todo.text);
    setSelectedStatus(todo.status);
    setDueDate(todo.dueDate || '');
    setTags(todo.tags || []);
    setEnableReminder(todo.reminder || false);
  };

  // Update todo handler
  const handleUpdate = () => {
    if (!newTodoText.trim()) return;
    
    const updatedTodo = {
      _id: editingId,
      text: newTodoText,
      status: selectedStatus,
      dueDate,
      reminder: enableReminder,
      tags: tags.filter(tag => tag.trim() !== ''),
      completed: todos.find(todo => todo._id === editingId)?.completed || false
    };
    
    dispatch(editTodo(updatedTodo));
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setNewTodoText('');
    setEditingId(null);
    setDueDate('');
    setTags([]);
    setEnableReminder(false);
  };

  if (loading) {
    return <div className="loading">Загрузка задач...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="todo-list">
      <div className="header">
        <h2>Управление задачами</h2>
        <button onClick={handleLogout} className="logout-button">
          Выйти
        </button>
      </div>
      
      {/* Task input */}
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Введите задачу"
        className="task-input"
      />

      {/* Status selection */}
      <div className="form-group">
        <label>Статус:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="status-select"
        >
          <option value="новая">Новая</option>
          <option value="в процессе">В процессе</option>
          <option value="завершена">Завершена</option>
        </select>
      </div>

      {/* Due date */}
      <div className="form-group">
        <label>Срок выполнения:</label>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-picker"
        />
      </div>

      {/* Tags */}
      <div className="form-group">
        <label>Теги:</label>
        <input
          type="text"
          value={tags.join(', ')}
          onChange={(e) => setTags(e.target.value.split(','))}
          placeholder="Работа, Дом, Спорт"
          className="tag-input"
        />
      </div>

      {/* Reminder */}
      <div className="form-group reminder-checkbox">
        <label>
          <input
            type="checkbox"
            checked={enableReminder}
            onChange={(e) => setEnableReminder(e.target.checked)}
          />
          Установить напоминание
        </label>
      </div>

      {/* Action button */}
      <button 
        onClick={editingId ? handleUpdate : handleAdd}
        className={`action-button ${editingId ? 'update' : 'add'}`}
      >
        {editingId ? 'Обновить' : 'Добавить'}
      </button>

      {/* Todo list */}
      <div className="tasks-container">
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onEdit={() => handleEdit(todo)}
              onDelete={() => dispatch(deleteTodo(todo._id))}
            />
          ))
        ) : (
          <div className="no-todos">Задачи отсутствуют</div>
        )}
      </div>
    </div>
  );
};

export default TodoList;